import { useState } from "react";
import {
  authService,
  type OtpConfirmation,
} from "@/services/firebase/authService";
import { userService } from "@/services/firebase/userService";

type Step = "phone" | "otp";

export function useOtpLogin() {
  const [step, setStep] = useState<Step>("phone");
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmation, setConfirmation] = useState<OtpConfirmation | null>(
    null
  );

  const sendOtp = async () => {
    const digits = phone.replace(/\D/g, "");
    if (digits.length !== 10) {
      setError("10 अंकों का मोबाइल नंबर डालें");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const result = await authService.sendOtp(`+91${digits}`);
      setConfirmation(result);
      setStep("otp");
    } catch (e) {
      setError("OTP भेजने में समस्या हुई। दोबारा कोशिश करें।");
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    if (!confirmation || code.trim().length < 6) {
      setError("6 अंकों का OTP डालें");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const user = await authService.verifyOtp(confirmation, code.trim());
      await userService.upsertUser(user);
      // Root layout redirects automatically once auth state updates
    } catch (e) {
      setError("OTP गलत है। दोबारा कोशिश करें।");
    } finally {
      setLoading(false);
    }
  };

  const backToPhone = () => {
    setStep("phone");
    setCode("");
    setError(null);
  };

  return {
    step,
    phone,
    setPhone,
    code,
    setCode,
    loading,
    error,
    sendOtp,
    verifyOtp,
    backToPhone,
  };
}

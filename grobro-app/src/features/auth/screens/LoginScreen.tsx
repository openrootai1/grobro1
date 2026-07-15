import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { APP_NAME, APP_TAGLINE, COLORS } from "@/constants/theme";
import { PrimaryButton } from "@/shared/ui/PrimaryButton";
import { useOtpLogin } from "../hooks/useOtpLogin";

export function LoginScreen() {
  const insets = useSafeAreaInsets();
  const {
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
  } = useOtpLogin();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      className="flex-1 bg-purple-deeper"
    >
      <View
        className="items-center px-6 pb-10"
        style={{ paddingTop: insets.top + 48 }}
      >
        <View className="w-16 h-16 rounded-full border-2 border-white/70 items-center justify-center mb-3">
          <Ionicons name="trending-up" size={30} color="#FFFFFF" />
        </View>
        <Text className="text-white text-4xl font-extrabold">{APP_NAME}</Text>
        <Text className="text-white/80 text-xs tracking-widest mt-1">
          {APP_TAGLINE}
        </Text>
        <Text className="text-white/90 text-base mt-4 text-center">
          सीखो, शुरू करो, और कमाओ!
        </Text>
      </View>

      <View className="flex-1 bg-bg rounded-t-3xl px-6 pt-8">
        {step === "phone" ? (
          <>
            <Text className="text-ink text-xl font-extrabold">
              मोबाइल नंबर से लॉगिन करें
            </Text>
            <Text className="text-muted mt-1 mb-5">
              हम आपको एक OTP भेजेंगे — कोई पासवर्ड नहीं
            </Text>
            <View className="flex-row items-center bg-white border border-purple-light rounded-2xl px-4 h-14 mb-4">
              <Text className="text-ink font-bold mr-2">+91</Text>
              <TextInput
                className="flex-1 text-ink text-base"
                keyboardType="number-pad"
                maxLength={10}
                placeholder="मोबाइल नंबर"
                placeholderTextColor={COLORS.muted}
                value={phone}
                onChangeText={setPhone}
              />
            </View>
            <PrimaryButton label="OTP भेजें" onPress={sendOtp} loading={loading} />
          </>
        ) : (
          <>
            <Text className="text-ink text-xl font-extrabold">OTP डालें</Text>
            <Text className="text-muted mt-1 mb-5">
              +91 {phone} पर भेजा गया 6 अंकों का कोड डालें
            </Text>
            <TextInput
              className="bg-white border border-purple-light rounded-2xl px-4 h-14 text-ink text-lg tracking-[8px] mb-4"
              keyboardType="number-pad"
              maxLength={6}
              placeholder="••••••"
              placeholderTextColor={COLORS.muted}
              value={code}
              onChangeText={setCode}
            />
            <PrimaryButton
              label="लॉगिन करें"
              onPress={verifyOtp}
              loading={loading}
            />
            <Pressable onPress={backToPhone} className="mt-4 items-center">
              <Text className="text-purple font-bold">नंबर बदलें</Text>
            </Pressable>
          </>
        )}

        {error ? (
          <Text className="text-red-600 mt-4 text-center">{error}</Text>
        ) : null}
      </View>
    </KeyboardAvoidingView>
  );
}

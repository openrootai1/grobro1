import "@react-native-firebase/app";
import {
  getAuth,
  signInWithPhoneNumber,
  onAuthStateChanged,
  signOut as firebaseSignOut,
  type ConfirmationResult,
  type User,
} from "@react-native-firebase/auth";

export type OtpConfirmation = ConfirmationResult;
export type AuthUser = User;

/**
 * Sideloaded preview APKs often fail Play Integrity. For V1 testing with
 * Firebase test phone numbers, disable app verification so OTP can proceed.
 * Turn this off before Play Store release / real SMS numbers.
 */
function preparePhoneAuth() {
  const auth = getAuth();
  auth.settings.appVerificationDisabledForTesting = true;
  return auth;
}

function formatAuthError(error: unknown): string {
  if (error && typeof error === "object") {
    const e = error as { code?: string; message?: string };
    const code = e.code ?? "unknown";
    const message = e.message ?? "OTP failed";
    return `${code}: ${message}`;
  }
  return "OTP failed";
}

export const authService = {
  /** Sends an OTP SMS. Phone must be in E.164 format, e.g. +919999900000 */
  async sendOtp(phoneNumber: string): Promise<OtpConfirmation> {
    try {
      return await signInWithPhoneNumber(preparePhoneAuth(), phoneNumber);
    } catch (error) {
      throw new Error(formatAuthError(error));
    }
  },

  /** Confirms the OTP code the user typed. Resolves with the signed-in user. */
  async verifyOtp(
    confirmation: OtpConfirmation,
    code: string
  ): Promise<AuthUser> {
    try {
      const credential = await confirmation.confirm(code);
      if (!credential?.user) {
        throw new Error("OTP verification failed");
      }
      return credential.user;
    } catch (error) {
      throw new Error(formatAuthError(error));
    }
  },

  /** Subscribes to login state changes. Returns an unsubscribe function. */
  subscribe(callback: (user: AuthUser | null) => void): () => void {
    return onAuthStateChanged(getAuth(), callback);
  },

  signOut(): Promise<void> {
    return firebaseSignOut(getAuth());
  },
};

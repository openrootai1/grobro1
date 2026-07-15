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

export const authService = {
  /** Sends an OTP SMS. Phone must be in E.164 format, e.g. +919999900000 */
  sendOtp(phoneNumber: string): Promise<OtpConfirmation> {
    return signInWithPhoneNumber(getAuth(), phoneNumber);
  },

  /** Confirms the OTP code the user typed. Resolves with the signed-in user. */
  async verifyOtp(
    confirmation: OtpConfirmation,
    code: string
  ): Promise<AuthUser> {
    const credential = await confirmation.confirm(code);
    if (!credential?.user) {
      throw new Error("OTP verification failed");
    }
    return credential.user;
  },

  /** Subscribes to login state changes. Returns an unsubscribe function. */
  subscribe(callback: (user: AuthUser | null) => void): () => void {
    return onAuthStateChanged(getAuth(), callback);
  },

  signOut(): Promise<void> {
    return firebaseSignOut(getAuth());
  },
};

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
} from "@react-native-firebase/firestore";
import type { AuthUser } from "./authService";

export const userService = {
  /** Creates the user document on first login, updates it afterwards. */
  async upsertUser(user: AuthUser): Promise<void> {
    const ref = doc(getFirestore(), "users", user.uid);
    const snapshot = await getDoc(ref);

    if (snapshot.exists()) {
      await setDoc(
        ref,
        { phoneNumber: user.phoneNumber, updatedAt: serverTimestamp() },
        { merge: true }
      );
      return;
    }

    await setDoc(ref, {
      firebaseUid: user.uid,
      phoneNumber: user.phoneNumber,
      name: null,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  },
};

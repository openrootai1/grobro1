import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
} from "@react-native-firebase/firestore";

export const supportService = {
  async submitRequest(
    userId: string,
    name: string,
    message: string
  ): Promise<void> {
    await addDoc(collection(getFirestore(), "supportRequests"), {
      userId,
      name,
      message,
      status: "open",
      createdAt: serverTimestamp(),
    });
  },
};

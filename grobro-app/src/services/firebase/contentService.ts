import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "@react-native-firebase/firestore";
import type { Business, Video, VisualGuide, GuideSection } from "@/types/content";

const db = () => getFirestore();

// Sorting happens client-side to avoid Firestore composite indexes.
const byOrder = <T extends { orderIndex: number }>(a: T, b: T) =>
  a.orderIndex - b.orderIndex;

export const contentService = {
  async getBusinesses(): Promise<Business[]> {
    const snapshot = await getDocs(
      query(collection(db(), "businesses"), where("isActive", "==", true))
    );
    return snapshot.docs
      .map((d) => ({ id: d.id, ...d.data() }) as Business)
      .sort(byOrder);
  },

  async getVideos(businessId: string): Promise<Video[]> {
    const snapshot = await getDocs(
      query(
        collection(db(), "videos"),
        where("businessId", "==", businessId),
        where("isPublished", "==", true)
      )
    );
    return snapshot.docs
      .map((d) => ({ id: d.id, ...d.data() }) as Video)
      .sort(byOrder);
  },

  async getVisualGuide(businessId: string): Promise<VisualGuide | null> {
    const snapshot = await getDocs(
      query(
        collection(db(), "visualGuides"),
        where("businessId", "==", businessId),
        where("isPublished", "==", true)
      )
    );
    const docSnap = snapshot.docs[0];
    if (!docSnap) return null;
    const data = docSnap.data();
    const contentJson = data.contentJson as { sections: GuideSection[] };
    return {
      id: docSnap.id,
      businessId: data.businessId,
      title: data.title,
      sections: contentJson?.sections ?? [],
      isPublished: data.isPublished,
    };
  },
};

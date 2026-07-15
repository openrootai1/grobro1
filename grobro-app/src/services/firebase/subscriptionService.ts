import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
} from "@react-native-firebase/firestore";
import type { Subscription } from "@/types/subscription";

const TRIAL_DAYS = 3;

const ref = (userId: string) =>
  doc(getFirestore(), "subscriptions", userId);

export const subscriptionService = {
  async getSubscription(userId: string): Promise<Subscription | null> {
    const snapshot = await getDoc(ref(userId));
    if (!snapshot.exists()) return null;
    return snapshot.data() as Subscription;
  },

  /**
   * Starts the 3-day trial. Payment is stubbed for now — when Razorpay is
   * integrated, the ₹5 charge must succeed before this is called.
   */
  async startTrial(userId: string): Promise<Subscription> {
    const now = Date.now();
    const subscription: Subscription = {
      userId,
      status: "trial",
      trialStartedAt: now,
      trialEndAt: now + TRIAL_DAYS * 24 * 60 * 60 * 1000,
      subscriptionStartedAt: null,
      subscriptionEndAt: null,
      razorpaySubscriptionId: null,
    };
    await setDoc(ref(userId), subscription);
    return subscription;
  },

  /** Cancels the trial. Access continues until trialEndAt. */
  async cancelTrial(userId: string): Promise<Subscription | null> {
    const current = await this.getSubscription(userId);
    if (!current) return null;
    const updated: Subscription = { ...current, status: "cancelled" };
    await setDoc(ref(userId), updated);
    return updated;
  },
};

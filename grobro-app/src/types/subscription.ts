export type SubscriptionStatus =
  | "none"
  | "trial"
  | "active"
  | "cancelled"
  | "expired";

export interface Subscription {
  userId: string;
  status: SubscriptionStatus;
  trialStartedAt: number | null;
  trialEndAt: number | null;
  subscriptionStartedAt: number | null;
  subscriptionEndAt: number | null;
  razorpaySubscriptionId: string | null;
}

export function hasContentAccess(sub: Subscription | null): boolean {
  if (!sub) return false;
  const now = Date.now();
  if (sub.status === "trial" || sub.status === "cancelled") {
    return sub.trialEndAt !== null && now < sub.trialEndAt;
  }
  if (sub.status === "active") {
    return sub.subscriptionEndAt === null || now < sub.subscriptionEndAt;
  }
  return false;
}

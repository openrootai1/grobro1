import { create } from "zustand";
import type { Subscription } from "@/types/subscription";
import { hasContentAccess } from "@/types/subscription";
import { subscriptionService } from "@/services/firebase/subscriptionService";

interface SubscriptionState {
  loaded: boolean;
  subscription: Subscription | null;
  hasAccess: boolean;
  load: (userId: string) => Promise<void>;
  startTrial: (userId: string) => Promise<void>;
  cancelTrial: (userId: string) => Promise<void>;
  reset: () => void;
}

export const useSubscriptionStore = create<SubscriptionState>((set) => ({
  loaded: false,
  subscription: null,
  hasAccess: false,

  load: async (userId) => {
    const subscription = await subscriptionService.getSubscription(userId);
    set({
      subscription,
      hasAccess: hasContentAccess(subscription),
      loaded: true,
    });
  },

  startTrial: async (userId) => {
    const subscription = await subscriptionService.startTrial(userId);
    set({ subscription, hasAccess: hasContentAccess(subscription) });
  },

  cancelTrial: async (userId) => {
    const subscription = await subscriptionService.cancelTrial(userId);
    set({ subscription, hasAccess: hasContentAccess(subscription) });
  },

  reset: () => set({ loaded: false, subscription: null, hasAccess: false }),
}));

import { getAnalytics, logEvent } from "@react-native-firebase/analytics";

export type AnalyticsEvent =
  | "app_opened"
  | "otp_started"
  | "otp_verified"
  | "trial_screen_viewed"
  | "trial_started"
  | "trial_cancelled"
  | "subscription_started"
  | "subscription_renewed"
  | "repurchase_screen_viewed"
  | "business_opened"
  | "video_started"
  | "video_completed"
  | "visual_guide_opened"
  | "profile_opened"
  | "support_submitted";

export const analyticsService = {
  track(event: AnalyticsEvent, params?: Record<string, string>): void {
    // Fire-and-forget: analytics must never break the app flow
    logEvent(getAnalytics(), event, params).catch(() => {});
  },
};

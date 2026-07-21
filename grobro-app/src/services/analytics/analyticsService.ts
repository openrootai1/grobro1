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
  /**
   * Analytics is deliberately inert until the Android app is stable.
   * Importing the native Firebase Analytics module at startup can crash
   * Expo standalone builds. The event call sites are retained so the
   * integration can be restored without changing product flows.
   */
  track(_event: AnalyticsEvent, _params?: Record<string, string>): void {
    // no-op
  },
};

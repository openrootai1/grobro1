import "../global.css";
import { View, ActivityIndicator } from "react-native";
import { Stack, useRouter, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { COLORS } from "@/constants/theme";
import { useAuthListener } from "@/features/auth/hooks/useAuthListener";
import { useAuthStore } from "@/store/authStore";
import { useSubscriptionStore } from "@/store/subscriptionStore";
import { analyticsService } from "@/services/analytics/analyticsService";

export default function RootLayout() {
  useAuthListener();
  useEffect(() => {
    analyticsService.track("app_opened");
  }, []);
  const { user, initializing } = useAuthStore();
  const { loaded, hasAccess, load, reset } = useSubscriptionStore();
  const segments = useSegments();
  const router = useRouter();

  // Load subscription state whenever the logged-in user changes
  useEffect(() => {
    if (user) {
      load(user.uid).catch(() => {
        /* keeps loaded=false; user stays on loading view and can restart app */
      });
    } else {
      reset();
    }
  }, [user, load, reset]);

  useEffect(() => {
    if (initializing) return;
    const current = segments[0] as string | undefined;

    if (!user) {
      if (current !== "login") router.replace("/login");
      return;
    }
    if (!loaded) return;

    if (!hasAccess) {
      if (current !== "trial") router.replace("/trial");
    } else if (current === "login" || current === "trial") {
      router.replace("/(tabs)");
    }
  }, [user, initializing, loaded, hasAccess, segments, router]);

  const waiting = initializing || (user && !loaded);

  if (waiting) {
    return (
      <View
        className="flex-1 items-center justify-center"
        style={{ backgroundColor: COLORS.purpleDeeper }}
      >
        <ActivityIndicator size="large" color="#FFFFFF" />
      </View>
    );
  }

  return (
    <>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: COLORS.bg },
        }}
      >
        <Stack.Screen name="login" />
        <Stack.Screen name="trial" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="profile" options={{ presentation: "card" }} />
      </Stack>
    </>
  );
}

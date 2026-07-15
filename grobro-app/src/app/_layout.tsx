import "../global.css";
import { View, ActivityIndicator } from "react-native";
import { Stack, useRouter, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { COLORS } from "@/constants/theme";
import { useAuthListener } from "@/features/auth/hooks/useAuthListener";
import { useAuthStore } from "@/store/authStore";

export default function RootLayout() {
  useAuthListener();
  const { user, initializing } = useAuthStore();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (initializing) return;
    const onLogin = segments[0] === "login";
    if (!user && !onLogin) {
      router.replace("/login");
    } else if (user && onLogin) {
      router.replace("/(tabs)");
    }
  }, [user, initializing, segments, router]);

  if (initializing) {
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
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="profile" options={{ presentation: "card" }} />
      </Stack>
    </>
  );
}

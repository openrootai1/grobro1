import { View, Text, ScrollView } from "react-native";
import { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { APP_NAME, COLORS } from "@/constants/theme";
import { PrimaryButton } from "@/shared/ui/PrimaryButton";
import { useAuthStore } from "@/store/authStore";
import { useSubscriptionStore } from "@/store/subscriptionStore";
import { analyticsService } from "@/services/analytics/analyticsService";

const BENEFITS = [
  "10+ बिज़नेस की पूरी वीडियो गाइड",
  "स्टेप-बाय-स्टेप विज़ुअल गाइड",
  "आसान भाषा, पूरी समझ",
  "कम निवेश, ज़्यादा मुनाफ़ा वाले आइडिया",
];

export function TrialScreen() {
  const insets = useSafeAreaInsets();
  const user = useAuthStore((s) => s.user);
  const startTrial = useSubscriptionStore((s) => s.startTrial);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    analyticsService.track("trial_screen_viewed");
  }, []);

  const onStartTrial = async () => {
    if (!user) return;
    setLoading(true);
    setError(null);
    try {
      // TODO(razorpay): charge ₹5 before activating the trial
      await startTrial(user.uid);
      analyticsService.track("trial_started");
    } catch {
      setError("कुछ गलत हुआ। दोबारा कोशिश करें।");
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-purple-deeper">
      <ScrollView
        contentContainerStyle={{
          paddingTop: insets.top + 40,
          paddingBottom: 40,
          paddingHorizontal: 24,
        }}
      >
        <View className="items-center mb-8">
          <View className="w-16 h-16 rounded-full border-2 border-white/70 items-center justify-center mb-3">
            <Ionicons name="trending-up" size={30} color="#FFFFFF" />
          </View>
          <Text className="text-white text-3xl font-extrabold">{APP_NAME}</Text>
          <Text className="text-white/90 text-lg mt-3 text-center font-bold">
            आज से कमाई शुरू करो!
          </Text>
          <Text className="text-white/80 mt-1 text-center">
            सही guidance, सही direction, पक्की कमाई
          </Text>
        </View>

        <View className="bg-white rounded-3xl p-6">
          <Text className="text-purple-dark text-center text-4xl font-extrabold">
            ₹5
          </Text>
          <Text className="text-ink text-center font-bold mt-1">
            3 दिन का ट्रायल
          </Text>
          <Text className="text-muted text-center text-xs mt-1 mb-5">
            फिर ₹199/महीना — कभी भी cancel करें
          </Text>

          {BENEFITS.map((benefit) => (
            <View key={benefit} className="flex-row items-center mb-3">
              <Ionicons
                name="checkmark-circle"
                size={20}
                color={COLORS.purple}
              />
              <Text className="text-ink ml-2 flex-1">{benefit}</Text>
            </View>
          ))}

          <View className="mt-3">
            <PrimaryButton
              label="₹5 में ट्रायल शुरू करें"
              onPress={onStartTrial}
              loading={loading}
            />
          </View>
          {error ? (
            <Text className="text-red-600 mt-3 text-center">{error}</Text>
          ) : null}
        </View>
      </ScrollView>
    </View>
  );
}

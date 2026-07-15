import { View, Text, Pressable, Alert } from "react-native";
import { useAuthStore } from "@/store/authStore";
import { useSubscriptionStore } from "@/store/subscriptionStore";
import { analyticsService } from "@/services/analytics/analyticsService";

function formatDate(ms: number | null): string {
  if (!ms) return "—";
  return new Date(ms).toLocaleDateString("hi-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

const STATUS_LABELS: Record<string, string> = {
  trial: "ट्रायल चालू है",
  active: "सब्सक्रिप्शन चालू है",
  cancelled: "ट्रायल रद्द किया गया",
  expired: "सब्सक्रिप्शन खत्म",
  none: "कोई सब्सक्रिप्शन नहीं",
};

export function SubscriptionCard() {
  const user = useAuthStore((s) => s.user);
  const { subscription, cancelTrial } = useSubscriptionStore();

  if (!subscription) return null;

  const onCancel = () => {
    Alert.alert(
      "ट्रायल रद्द करें?",
      "ट्रायल खत्म होने तक आपके पास एक्सेस रहेगा। उसके बाद कंटेंट बंद हो जाएगा।",
      [
        { text: "नहीं", style: "cancel" },
        {
          text: "हाँ, रद्द करें",
          style: "destructive",
          onPress: () => {
            if (user) {
              cancelTrial(user.uid)
                .then(() => analyticsService.track("trial_cancelled"))
                .catch(() => Alert.alert("समस्या", "दोबारा कोशिश करें।"));
            }
          },
        },
      ]
    );
  };

  return (
    <View className="bg-white border border-purple-light rounded-2xl p-4 mb-4">
      <Text className="text-ink font-extrabold mb-2">My Trial & Billing</Text>
      <Text className="text-ink">
        {STATUS_LABELS[subscription.status] ?? subscription.status}
      </Text>
      {subscription.status === "trial" || subscription.status === "cancelled" ? (
        <Text className="text-muted text-xs mt-1">
          ट्रायल खत्म होगा: {formatDate(subscription.trialEndAt)}
        </Text>
      ) : null}
      {subscription.status === "trial" ? (
        <Pressable onPress={onCancel} className="mt-3">
          <Text className="text-red-600 font-bold">ट्रायल रद्द करें</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

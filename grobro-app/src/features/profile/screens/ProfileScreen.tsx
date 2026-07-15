import { View, Text, ScrollView, Pressable, Alert } from "react-native";
import { useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { analyticsService } from "@/services/analytics/analyticsService";
import { COLORS } from "@/constants/theme";
import { DetailHeader } from "@/shared/components/DetailHeader";
import { authService } from "@/services/firebase/authService";
import { useAuthStore } from "@/store/authStore";
import { SubscriptionCard } from "../components/SubscriptionCard";
import { SupportForm } from "../components/SupportForm";

export function ProfileScreen() {
  const user = useAuthStore((s) => s.user);

  useEffect(() => {
    analyticsService.track("profile_opened");
  }, []);

  const onLogout = () => {
    Alert.alert("Logout", "क्या आप logout करना चाहते हैं?", [
      { text: "नहीं", style: "cancel" },
      {
        text: "हाँ",
        style: "destructive",
        onPress: () => {
          authService.signOut().catch(() => {
            Alert.alert("समस्या", "Logout नहीं हो पाया। दोबारा कोशिश करें।");
          });
        },
      },
    ]);
  };

  return (
    <View className="flex-1 bg-bg">
      <DetailHeader
        title="Profile"
        subtitle="आपकी सीखने की प्रगति और सेटिंग्स"
      />
      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 32 }}>
        <View className="bg-white border border-purple-light rounded-2xl p-4 mb-4 flex-row items-center">
          <View className="w-14 h-14 rounded-full bg-purple-light items-center justify-center">
            <Ionicons name="person" size={26} color={COLORS.purple} />
          </View>
          <View className="ml-3">
            <Text className="text-ink font-extrabold text-base">
              {user?.phoneNumber ?? ""}
            </Text>
            <Text className="text-muted text-xs mt-0.5">GroKro Member</Text>
          </View>
        </View>

        <SubscriptionCard />

        {user ? (
          <View className="mb-4">
            <SupportForm userId={user.uid} />
          </View>
        ) : null}

        <Pressable
          onPress={onLogout}
          className="bg-white border border-purple-light rounded-2xl p-4 flex-row items-center justify-between"
        >
          <Text className="text-red-600 font-bold">Logout</Text>
          <Ionicons name="log-out-outline" size={20} color="#DC2626" />
        </Pressable>
      </ScrollView>
    </View>
  );
}

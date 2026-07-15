import { View, Text, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { APP_NAME, APP_TAGLINE, COLORS } from "@/constants/theme";

export function TopBar() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View
      className="flex-row items-center justify-between px-4 pb-3 bg-purple-deeper"
      style={{ paddingTop: insets.top + 8 }}
    >
      <View className="flex-row items-center gap-2.5">
        <View className="w-10 h-10 rounded-full border-2 border-white/70 items-center justify-center">
          <Ionicons name="trending-up" size={20} color="#FFFFFF" />
        </View>
        <View>
          <Text className="text-white text-xl font-extrabold leading-6">
            {APP_NAME}
          </Text>
          <Text className="text-white/80 text-[10px] tracking-widest">
            {APP_TAGLINE}
          </Text>
        </View>
      </View>
      <Pressable
        onPress={() => router.push("/profile")}
        accessibilityLabel="Open Profile"
        className="w-9 h-9 rounded-full border border-white/50 bg-white/10 items-center justify-center"
      >
        <Ionicons name="person-outline" size={18} color={COLORS.surface} />
      </Pressable>
    </View>
  );
}

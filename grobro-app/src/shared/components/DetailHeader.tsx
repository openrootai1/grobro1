import { View, Text, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface DetailHeaderProps {
  title: string;
  subtitle?: string;
}

/** Purple header with back button, used on business detail / player / guide screens. */
export function DetailHeader({ title, subtitle }: DetailHeaderProps) {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View
      className="bg-purple-deeper px-4 pb-5"
      style={{ paddingTop: insets.top + 8 }}
    >
      <Pressable
        onPress={() => router.back()}
        accessibilityLabel="Back"
        className="w-9 h-9 rounded-full bg-white/10 items-center justify-center mb-3"
      >
        <Ionicons name="arrow-back" size={20} color="#FFFFFF" />
      </Pressable>
      <Text className="text-white text-2xl font-extrabold">{title}</Text>
      {subtitle ? (
        <Text className="text-white/85 mt-1">{subtitle}</Text>
      ) : null}
    </View>
  );
}

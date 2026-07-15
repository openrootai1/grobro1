import { Pressable, Text, Image, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/constants/theme";
import type { Business } from "@/types/content";

interface BusinessCardProps {
  business: Business;
  onPress: () => void;
}

export function BusinessCard({ business, onPress }: BusinessCardProps) {
  return (
    <Pressable
      onPress={onPress}
      className="bg-white border border-purple-light rounded-2xl p-3 flex-1 m-1.5"
    >
      {business.thumbnailUrl ? (
        <Image
          source={{ uri: business.thumbnailUrl }}
          className="w-full h-24 rounded-xl bg-purple-light"
          resizeMode="cover"
        />
      ) : (
        <View className="w-full h-24 rounded-xl bg-purple-light items-center justify-center">
          <Ionicons name="briefcase-outline" size={32} color={COLORS.purple} />
        </View>
      )}
      <Text className="text-ink font-bold mt-2" numberOfLines={2}>
        {business.title}
      </Text>
      <View className="flex-row items-center justify-end mt-1">
        <View className="w-6 h-6 rounded-full bg-purple items-center justify-center">
          <Ionicons name="chevron-forward" size={14} color="#FFFFFF" />
        </View>
      </View>
    </Pressable>
  );
}

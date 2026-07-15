import { Pressable, Text, View, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/constants/theme";
import type { Video } from "@/types/content";

function formatDuration(seconds?: number): string | null {
  if (!seconds) return null;
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

interface VideoListItemProps {
  video: Video;
  index: number;
  onPress: () => void;
}

export function VideoListItem({ video, index, onPress }: VideoListItemProps) {
  const duration = formatDuration(video.durationSeconds);

  return (
    <Pressable
      onPress={onPress}
      className="flex-row bg-white border border-purple-light rounded-2xl p-3 mx-4 mb-3"
    >
      <View className="w-28 h-20 rounded-xl bg-purple-light overflow-hidden">
        {video.thumbnailUrl ? (
          <Image
            source={{ uri: video.thumbnailUrl }}
            className="w-full h-full"
            resizeMode="cover"
          />
        ) : (
          <View className="flex-1 items-center justify-center">
            <Ionicons name="play-circle" size={30} color={COLORS.purple} />
          </View>
        )}
        <View className="absolute top-1 left-1 bg-purple rounded-md px-1.5 py-0.5">
          <Text className="text-white text-[10px] font-bold">{index + 1}</Text>
        </View>
        {duration ? (
          <View className="absolute bottom-1 right-1 bg-black/70 rounded px-1">
            <Text className="text-white text-[10px]">{duration}</Text>
          </View>
        ) : null}
      </View>
      <View className="flex-1 ml-3 justify-center">
        <Text className="text-ink font-bold" numberOfLines={2}>
          {video.title}
        </Text>
        <Text className="text-muted text-xs mt-1" numberOfLines={2}>
          {video.description}
        </Text>
        <View className="self-start bg-purple-light rounded-full px-2 py-0.5 mt-1.5">
          <Text className="text-purple text-[10px] font-bold">
            Step {index + 1}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

import { View, Text } from "react-native";
import { useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
import { Video as ExpoVideo, ResizeMode } from "expo-av";
import { DetailHeader } from "@/shared/components/DetailHeader";
import { EmptyView } from "@/shared/components/StatusViews";
import { analyticsService } from "@/services/analytics/analyticsService";

export function VideoPlayerScreen() {
  const { videoUrl, title } = useLocalSearchParams<{
    videoUrl?: string;
    title?: string;
  }>();

  useEffect(() => {
    if (videoUrl) {
      analyticsService.track("video_started", { title: title ?? "" });
    }
  }, [videoUrl, title]);

  return (
    <View className="flex-1 bg-bg">
      <DetailHeader title={title ?? "Video"} />
      {videoUrl ? (
        <>
          <ExpoVideo
            source={{ uri: videoUrl }}
            useNativeControls
            resizeMode={ResizeMode.CONTAIN}
            shouldPlay
            style={{ width: "100%", aspectRatio: 16 / 9, backgroundColor: "#000" }}
          />
          <Text className="text-ink font-bold px-4 mt-4 text-base">
            {title}
          </Text>
        </>
      ) : (
        <EmptyView message="वीडियो उपलब्ध नहीं है।" />
      )}
    </View>
  );
}

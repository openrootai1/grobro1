import { View, Text, FlatList } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { DetailHeader } from "@/shared/components/DetailHeader";
import {
  LoadingView,
  ErrorView,
  EmptyView,
} from "@/shared/components/StatusViews";
import { useVideos } from "../hooks/useVideos";
import { VideoListItem } from "../components/VideoListItem";

export function BusinessVideosScreen() {
  const router = useRouter();
  const { id, title } = useLocalSearchParams<{ id: string; title?: string }>();
  const { data: videos, loading, error, refetch } = useVideos(id);

  return (
    <View className="flex-1 bg-bg">
      <DetailHeader
        title={title ?? "Video Guide"}
        subtitle={videos ? `${videos.length} Videos` : undefined}
      />
      {loading ? (
        <LoadingView />
      ) : error ? (
        <ErrorView message={error} onRetry={refetch} />
      ) : !videos || videos.length === 0 ? (
        <EmptyView message="इस बिज़नेस के वीडियो जल्द आ रहे हैं।" />
      ) : (
        <FlatList
          data={videos}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={
            <Text className="text-purple-dark font-extrabold px-4 pt-4 pb-3">
              सभी वीडियो ({videos.length})
            </Text>
          }
          contentContainerStyle={{ paddingBottom: 24 }}
          renderItem={({ item, index }) => (
            <VideoListItem
              video={item}
              index={index}
              onPress={() =>
                router.push({
                  pathname: "/player",
                  params: { videoUrl: item.videoUrl, title: item.title },
                })
              }
            />
          )}
        />
      )}
    </View>
  );
}

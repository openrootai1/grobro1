import { View, Text, FlatList } from "react-native";
import { useRouter } from "expo-router";
import { TopBar } from "@/shared/components/TopBar";
import { BusinessCard } from "@/shared/components/BusinessCard";
import {
  LoadingView,
  ErrorView,
  EmptyView,
} from "@/shared/components/StatusViews";
import { useBusinesses } from "@/features/video-guides/hooks/useBusinesses";

export function VisualGuidesScreen() {
  const router = useRouter();
  const { data: businesses, loading, error, refetch } = useBusinesses();

  return (
    <View className="flex-1 bg-bg">
      <TopBar />
      <View className="bg-purple-deeper px-5 pb-6">
        <Text className="text-white text-3xl font-extrabold">
          Visual Guides
        </Text>
        <Text className="text-white/85 mt-1">
          स्टेप-बाय-स्टेप बिज़नेस गाइड पढ़ें
        </Text>
      </View>
      {loading ? (
        <LoadingView />
      ) : error ? (
        <ErrorView message={error} onRetry={refetch} />
      ) : !businesses || businesses.length === 0 ? (
        <EmptyView message="अभी कोई विज़ुअल गाइड नहीं है।" />
      ) : (
        <FlatList
          data={businesses}
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerStyle={{ paddingVertical: 12, paddingBottom: 24 }}
          columnWrapperStyle={{ paddingHorizontal: 10 }}
          renderItem={({ item }) => (
            <BusinessCard
              business={item}
              onPress={() =>
                router.push({
                  pathname: "/business/[id]/guide",
                  params: { id: item.id, title: item.title },
                })
              }
            />
          )}
        />
      )}
    </View>
  );
}

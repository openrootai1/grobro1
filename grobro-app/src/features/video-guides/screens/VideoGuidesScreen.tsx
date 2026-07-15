import { View, Text, FlatList } from "react-native";
import { useRouter } from "expo-router";
import { TopBar } from "@/shared/components/TopBar";
import { BusinessCard } from "@/shared/components/BusinessCard";
import {
  LoadingView,
  ErrorView,
  EmptyView,
} from "@/shared/components/StatusViews";
import { useBusinesses } from "../hooks/useBusinesses";

export function VideoGuidesScreen() {
  const router = useRouter();
  const { data: businesses, loading, error, refetch } = useBusinesses();

  return (
    <View className="flex-1 bg-bg">
      <TopBar />
      <View className="bg-purple-deeper px-5 pb-6">
        <Text className="text-white text-3xl font-extrabold">Video Guides</Text>
        <Text className="text-white/85 mt-1">Business सीखो, Step-by-Step</Text>
      </View>
      {loading ? (
        <LoadingView />
      ) : error ? (
        <ErrorView message={error} onRetry={refetch} />
      ) : !businesses || businesses.length === 0 ? (
        <EmptyView message="अभी कोई वीडियो गाइड नहीं है।" />
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
                  pathname: "/business/[id]/videos",
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

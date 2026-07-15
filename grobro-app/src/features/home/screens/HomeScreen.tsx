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

function HeroSection() {
  return (
    <View className="bg-purple-deeper px-5 pt-4 pb-8 rounded-b-3xl">
      <Text className="text-white text-3xl font-extrabold leading-9">
        सीखो, शुरू करो,{"\n"}और कमाओ!
      </Text>
      <Text className="text-white/85 mt-2 text-sm">
        GroKro के साथ हर कोई बना सकता है अपनी पहचान
      </Text>
    </View>
  );
}

export function HomeScreen() {
  const router = useRouter();
  const { data: businesses, loading, error, refetch } = useBusinesses();

  return (
    <View className="flex-1 bg-bg">
      <TopBar />
      {loading ? (
        <LoadingView />
      ) : error ? (
        <ErrorView message={error} onRetry={refetch} />
      ) : !businesses || businesses.length === 0 ? (
        <EmptyView message="अभी कोई बिज़नेस आइडिया नहीं है। जल्द आ रहा है!" />
      ) : (
        <FlatList
          data={businesses}
          keyExtractor={(item) => item.id}
          numColumns={2}
          ListHeaderComponent={
            <>
              <HeroSection />
              <Text className="text-ink text-lg font-extrabold px-4 pt-5 pb-2">
                Top Business Ideas
              </Text>
            </>
          }
          contentContainerStyle={{ paddingBottom: 24 }}
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

import { View, Text, ScrollView, Image } from "react-native";
import { useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
import { analyticsService } from "@/services/analytics/analyticsService";
import { DetailHeader } from "@/shared/components/DetailHeader";
import {
  LoadingView,
  ErrorView,
  EmptyView,
} from "@/shared/components/StatusViews";
import { useVisualGuide } from "../hooks/useVisualGuide";

export function VisualGuideScreen() {
  const { id, title } = useLocalSearchParams<{ id: string; title?: string }>();
  const { data: guide, loading, error, refetch } = useVisualGuide(id);

  useEffect(() => {
    analyticsService.track("visual_guide_opened", { businessId: id });
  }, [id]);

  return (
    <View className="flex-1 bg-bg">
      <DetailHeader title={guide?.title ?? title ?? "Visual Guide"} />
      {loading ? (
        <LoadingView />
      ) : error ? (
        <ErrorView message={error} onRetry={refetch} />
      ) : !guide || guide.sections.length === 0 ? (
        <EmptyView message="इस बिज़नेस की गाइड जल्द आ रही है।" />
      ) : (
        <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 32 }}>
          {guide.sections.map((section, i) => (
            <View
              key={i}
              className="bg-white border border-purple-light rounded-2xl p-4 mb-3"
            >
              <Text className="text-purple-dark font-extrabold text-base">
                {section.heading}
              </Text>
              {section.image ? (
                <Image
                  source={{ uri: section.image }}
                  className="w-full h-44 rounded-xl mt-3 bg-purple-light"
                  resizeMode="cover"
                />
              ) : null}
              <Text className="text-ink mt-3 leading-6">{section.text}</Text>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
}

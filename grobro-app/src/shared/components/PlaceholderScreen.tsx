import { View, Text } from "react-native";
import { TopBar } from "./TopBar";

interface PlaceholderScreenProps {
  title: string;
  subtitle?: string;
}

export function PlaceholderScreen({ title, subtitle }: PlaceholderScreenProps) {
  return (
    <View className="flex-1 bg-bg">
      <TopBar />
      <View className="flex-1 items-center justify-center px-6">
        <Text className="text-2xl font-extrabold text-ink">{title}</Text>
        {subtitle ? (
          <Text className="text-muted text-center mt-2">{subtitle}</Text>
        ) : null}
      </View>
    </View>
  );
}

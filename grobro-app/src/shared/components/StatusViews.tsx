import { View, Text, ActivityIndicator, Pressable } from "react-native";
import { COLORS } from "@/constants/theme";

export function LoadingView() {
  return (
    <View className="flex-1 items-center justify-center py-16">
      <ActivityIndicator size="large" color={COLORS.purple} />
    </View>
  );
}

interface ErrorViewProps {
  message: string;
  onRetry: () => void;
}

export function ErrorView({ message, onRetry }: ErrorViewProps) {
  return (
    <View className="flex-1 items-center justify-center py-16 px-6">
      <Text className="text-ink text-center mb-4">{message}</Text>
      <Pressable
        onPress={onRetry}
        className="bg-purple px-6 py-3 rounded-2xl"
      >
        <Text className="text-white font-bold">दोबारा कोशिश करें</Text>
      </Pressable>
    </View>
  );
}

export function EmptyView({ message }: { message: string }) {
  return (
    <View className="flex-1 items-center justify-center py-16 px-6">
      <Text className="text-muted text-center">{message}</Text>
    </View>
  );
}

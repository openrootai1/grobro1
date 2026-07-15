import { Pressable, Text, ActivityIndicator } from "react-native";

interface PrimaryButtonProps {
  label: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
}

export function PrimaryButton({
  label,
  onPress,
  loading = false,
  disabled = false,
}: PrimaryButtonProps) {
  const inactive = disabled || loading;
  return (
    <Pressable
      onPress={onPress}
      disabled={inactive}
      className={`h-13 py-3.5 rounded-2xl items-center justify-center ${
        inactive ? "bg-purple/50" : "bg-purple"
      }`}
    >
      {loading ? (
        <ActivityIndicator color="#FFFFFF" />
      ) : (
        <Text className="text-white font-extrabold text-base">{label}</Text>
      )}
    </Pressable>
  );
}

import { View, Text, TextInput } from "react-native";
import { useState } from "react";
import { COLORS } from "@/constants/theme";
import { PrimaryButton } from "@/shared/ui/PrimaryButton";
import { supportService } from "@/services/firebase/supportService";
import { analyticsService } from "@/services/analytics/analyticsService";

interface SupportFormProps {
  userId: string;
}

export function SupportForm({ userId }: SupportFormProps) {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async () => {
    if (!name.trim() || !message.trim()) {
      setError("नाम और मैसेज दोनों लिखें");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      await supportService.submitRequest(userId, name.trim(), message.trim());
      analyticsService.track("support_submitted");
      setDone(true);
    } catch {
      setError("मैसेज भेजने में समस्या हुई। दोबारा कोशिश करें।");
    } finally {
      setLoading(false);
    }
  };

  if (done) {
    return (
      <View className="bg-white border border-purple-light rounded-2xl p-4">
        <Text className="text-ink font-bold text-center">
          धन्यवाद! हम जल्द ही आपसे संपर्क करेंगे।
        </Text>
      </View>
    );
  }

  return (
    <View className="bg-white border border-purple-light rounded-2xl p-4">
      <Text className="text-ink font-extrabold mb-3">Help & Support</Text>
      <TextInput
        className="bg-bg border border-purple-light rounded-xl px-3 h-12 text-ink mb-3"
        placeholder="आपका नाम"
        placeholderTextColor={COLORS.muted}
        value={name}
        onChangeText={setName}
      />
      <TextInput
        className="bg-bg border border-purple-light rounded-xl px-3 py-3 text-ink mb-3"
        placeholder="अपनी समस्या या सवाल लिखें"
        placeholderTextColor={COLORS.muted}
        value={message}
        onChangeText={setMessage}
        multiline
        numberOfLines={4}
        textAlignVertical="top"
      />
      <PrimaryButton label="भेजें" onPress={submit} loading={loading} />
      {error ? (
        <Text className="text-red-600 mt-3 text-center">{error}</Text>
      ) : null}
    </View>
  );
}

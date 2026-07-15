import { contentService } from "@/services/firebase/contentService";
import { useAsyncData } from "@/shared/hooks/useAsyncData";

export function useVisualGuide(businessId: string) {
  return useAsyncData(
    () => contentService.getVisualGuide(businessId),
    [businessId]
  );
}

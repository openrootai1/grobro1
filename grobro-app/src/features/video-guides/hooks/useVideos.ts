import { contentService } from "@/services/firebase/contentService";
import { useAsyncData } from "@/shared/hooks/useAsyncData";

export function useVideos(businessId: string) {
  return useAsyncData(() => contentService.getVideos(businessId), [businessId]);
}

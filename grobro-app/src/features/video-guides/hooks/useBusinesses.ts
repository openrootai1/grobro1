import { contentService } from "@/services/firebase/contentService";
import { useAsyncData } from "@/shared/hooks/useAsyncData";

export function useBusinesses() {
  return useAsyncData(() => contentService.getBusinesses(), []);
}

import { useEffect } from "react";
import { authService } from "@/services/firebase/authService";
import { useAuthStore } from "@/store/authStore";

/** Keeps the auth store in sync with Firebase. Mount once in the root layout. */
export function useAuthListener() {
  const setUser = useAuthStore((s) => s.setUser);

  useEffect(() => {
    return authService.subscribe(setUser);
  }, [setUser]);
}

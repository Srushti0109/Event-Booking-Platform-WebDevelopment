"use client";

import { useCallback, useEffect, useState } from "react";
import { addRecentlyViewed, getRecentlyViewed } from "@/lib/storage";

export function useRecentlyViewed() {
  const [recentIds, setRecentIds] = useState<string[]>([]);

  useEffect(() => {
    setRecentIds(getRecentlyViewed());
  }, []);

  const trackView = useCallback((eventId: string) => {
    const updated = addRecentlyViewed(eventId);
    setRecentIds(updated);
  }, []);

  return { recentIds, trackView };
}

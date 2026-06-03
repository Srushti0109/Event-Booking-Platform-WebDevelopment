"use client";

import { useEffect } from "react";
import { useRecentlyViewed } from "@/hooks/use-recently-viewed";

interface EventDetailClientProps {
  eventId: string;
  children: React.ReactNode;
}

export function EventDetailClient({ eventId, children }: EventDetailClientProps) {
  const { trackView } = useRecentlyViewed();

  useEffect(() => {
    trackView(eventId);
  }, [eventId, trackView]);

  return <>{children}</>;
}

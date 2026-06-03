"use client";

import { useCallback, useEffect, useState } from "react";
import { getFavorites, toggleFavorite as toggleFavoriteStorage } from "@/lib/storage";

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setFavorites(getFavorites());
    setIsLoaded(true);
  }, []);

  const toggleFavorite = useCallback((eventId: string) => {
    const updated = toggleFavoriteStorage(eventId);
    setFavorites(updated);
    return updated.includes(eventId);
  }, []);

  const isFavorite = useCallback(
    (eventId: string) => favorites.includes(eventId),
    [favorites]
  );

  return { favorites, toggleFavorite, isFavorite, isLoaded };
}

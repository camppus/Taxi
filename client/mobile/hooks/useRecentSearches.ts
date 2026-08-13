import {
  addRecentSearch,
  clearRecentSearches,
  getRecentSearches,
  RecentSearch,
} from "@/storage/recentSearches";
import { useCallback, useEffect, useState } from "react";

export function useRecentSearches() {
  const [recents, setRecents] = useState<RecentSearch[]>([]);
  const [loading, setLoading] = useState(true);

  const loadRecents = useCallback(async () => {
    try {
      setLoading(true);

      const searches = await getRecentSearches();

      setRecents(searches);
    } finally {
      setLoading(false);
    }
  }, []);

  const addSearch = useCallback(
    async (from: string, to: string, seats: number, timestamp: string) => {
      const updated = await addRecentSearch({
        from,
        to,
        seats,
        timestamp,
      });

      setRecents(updated);
    },
    [],
  );

  const clearSearches = useCallback(async () => {
    await clearRecentSearches();
    setRecents([]);
  }, []);

  useEffect(() => {
    loadRecents();
  }, [loadRecents]);

  return {
    recents,
    loading,
    addSearch,
    clearSearches,
    reload: loadRecents,
  };
}

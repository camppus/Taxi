// context/RefreshContext.tsx

import React, { createContext, useCallback, useContext, useState } from "react";

type RefreshContextType = {
  refreshing: boolean;
  refresh: () => Promise<void>;
};

const RefreshContext = createContext<RefreshContextType | null>(null);

export function RefreshProvider({ children }: { children: React.ReactNode }) {
  const [refreshing, setRefreshing] = useState(false);

  const refresh = useCallback(async () => {
    if (refreshing) return;

    setRefreshing(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 700));
    } finally {
      setRefreshing(false);
    }
  }, [refreshing]);

  return (
    <RefreshContext.Provider value={{ refreshing, refresh }}>
      {children}
    </RefreshContext.Provider>
  );
}

export function useGlobalRefresh() {
  const context = useContext(RefreshContext);

  if (!context) {
    throw new Error(
      "useGlobalRefresh deve ser usado dentro de RefreshProvider",
    );
  }

  return context;
}

import AsyncStorage from "@react-native-async-storage/async-storage";

const RECENT_SEARCHES_KEY = "@recent_searches";
const MAX_RECENT_SEARCHES = 10;

export interface RecentSearch {
  from: string;
  to: string;
  timestamp: string;
  seats: number;
}

export const getRecentSearches = async (): Promise<RecentSearch[]> => {
  try {
    const stored = await AsyncStorage.getItem(RECENT_SEARCHES_KEY);

    if (!stored) return [];

    return JSON.parse(stored);
  } catch (error) {
    console.error("Erro ao carregar pesquisas recentes:", error);
    return [];
  }
};

export const addRecentSearch = async (search: RecentSearch) => {
  try {
    const current = await getRecentSearches();

    // Remove duplicado
    const filtered = current.filter(
      (item) =>
        !(
          item.from.trim().toLowerCase() === search.from.trim().toLowerCase() &&
          item.to.trim().toLowerCase() === search.to.trim().toLowerCase()
        ),
    );

    const updated: RecentSearch[] = [
      {
        ...search,
      },
      ...filtered,
    ].slice(0, MAX_RECENT_SEARCHES);

    await AsyncStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated));

    return updated;
  } catch (error) {
    console.error("Erro ao guardar pesquisa recente:", error);
    return [];
  }
};

export const clearRecentSearches = async () => {
  try {
    await AsyncStorage.removeItem(RECENT_SEARCHES_KEY);
  } catch (error) {
    console.error("Erro ao limpar pesquisas recentes:", error);
  }
};

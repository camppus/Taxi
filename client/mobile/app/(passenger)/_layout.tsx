import AppHeader from "@/components/AppHeader";
import BottomNavbar from "@/components/BottomNavbar";
import color from "@/styles/color";
import { UserRole } from "@/types/User";
import { Slot, useRouter, usePathname } from "expo-router";
import { useState } from "react";
import { RefreshControl, ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TabsLayout() {
  const userRole = UserRole.PASSAGER;

  const [refreshing, setRefreshing] = useState(false);

  const router = useRouter();
  const pathname = usePathname();

  async function onRefresh() {
    if (refreshing) return;

    setRefreshing(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 700));
      router.replace(pathname as any);
    } catch (w) {
      console.log(w);
    } finally {
      setRefreshing(false);
    }
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <View style={styles.container}>
        <AppHeader userRole={userRole} />

        <Slot />

        <BottomNavbar userRole={userRole} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  container: {
    flex: 1,
  },

  content: {
    flex: 1,
  },

  scroll: {
    flex: 1,
  },

  scrollContent: {
    flexGrow: 1,
  },
});

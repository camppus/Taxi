import AppHeader from "@/components/AppHeader";
import BottomNavbar from "@/components/BottomNavbar";
import { UserRole } from "@/types/User";
import { Slot } from "expo-router";
import { View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TabsLayout() {
  const userRole = UserRole.DRIVER;

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <View style={styles.container}>
        <AppHeader userRole={userRole} />
        <View style={styles.content}>
          <Slot />
        </View>

        <BottomNavbar userRole={userRole} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "white",
  },

  container: {
    flex: 1,
  },

  content: {
    flex: 1,
  },
});

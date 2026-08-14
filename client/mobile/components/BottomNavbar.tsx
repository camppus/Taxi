import { UserRole } from "@/types/User";
import { Ionicons } from "@expo/vector-icons";
import { usePathname, useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

const tabs = [
  {
    name: "Home",
    route: "/",
    icon: "home-outline",
    activeIcon: "home",
  },
  {
    name: "Viagens",
    route: "/bookings",
    icon: "car-outline",
    activeIcon: "car",
  },
  {
    name: "Conversas",
    route: "/conversation",
    icon: "chatbox-outline",
    activeIcon: "chatbox",
  },
  {
    name: "Perfil",
    route: "/profile",
    icon: "person-outline",
    activeIcon: "person",
  },
] as const;
export default function BottomNavbar({ userRole }: { userRole: UserRole }) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <View style={styles.wrapper}>
      <View style={styles.navbar}>
        {tabs.map((tab) => {
          const active =
            tab.route === "/"
              ? pathname === "/"
              : pathname.startsWith(tab.route);

          return (
            <Pressable
              key={tab.route}
              onPress={() => router.push(tab.route as any)}
              style={({ pressed }) => [styles.tab, pressed && styles.pressed]}
            >
              <Ionicons
                name={(active ? tab.activeIcon : tab.icon) as any}
                size={24}
                color={active ? "#151519" : "#999999"}
              />

              <Text style={[styles.label, active && styles.activeLabel]}>
                {tab.name}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 18,
    alignItems: "center",
  },

  navbar: {
    width: "92%",
    height: 82,
    backgroundColor: "#FFFFFF",
    borderRadius: 42,

    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,

    // Android
    elevation: 12,

    // iOS
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.2,
    shadowRadius: 12,
  },

  tab: {
    flex: 1,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },

  pressed: {
    opacity: 0.65,
  },

  label: {
    marginTop: 5,
    fontSize: 14,
    color: "#999999",
    fontWeight: "400",
  },

  activeLabel: {
    color: "#151519",
    fontWeight: "600",
  },
});

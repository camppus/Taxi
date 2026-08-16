import { UserRole } from "@/types/User";
import { Ionicons } from "@expo/vector-icons";
import { usePathname, useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function BottomNavbar({ userRole }: { userRole: UserRole }) {
  const router = useRouter();
  const pathname = usePathname();

  const tabs = {
    DRIVER: [
      {
        name: "Home",
        route: "/(driver)",
        activePath: "/",
        icon: "home-outline",
        activeIcon: "home",
      },
      {
        name: "Reservas",
        route: "/(driver)/bookings",
        activePath: "/bookings",
        icon: "car-outline",
        activeIcon: "car",
      },
      {
        name: "Veículos",
        route: "/(driver)/vehicles",
        activePath: "/vehicles",
        icon: "bicycle-outline",
        activeIcon: "bicycle",
      },
      {
        name: "Viagens",
        route: "/(driver)/trips",
        activePath: "/trips",
        icon: "navigate-outline",
        activeIcon: "navigate",
      },
    ],

    PASSAGER: [
      {
        name: "Home",
        route: "/(passenger)",
        activePath: "/",
        icon: "home-outline",
        activeIcon: "home",
      },
      {
        name: "Viagens",
        route: "/(passenger)/bookings",
        activePath: "/bookings",
        icon: "car-outline",
        activeIcon: "car",
      },
      {
        name: "Conversas",
        route: "/(passenger)/conversation",
        activePath: "/conversation",
        icon: "chatbox-outline",
        activeIcon: "chatbox",
      },
      {
        name: "Perfil",
        route: "/(passenger)/profile",
        activePath: "/profile",
        icon: "person-outline",
        activeIcon: "person",
      },
    ],
  } as const;

  const userTabs = tabs[userRole];

  return (
    <View style={styles.wrapper}>
      <View style={styles.navbar}>
        {userTabs.map((tab) => {
          const active =
            tab.activePath === "/"
              ? pathname === "/"
              : pathname.startsWith(tab.activePath);

          return (
            <Pressable
              key={tab.route}
              onPress={() => router.push(tab.route as never)}
              style={({ pressed }) => [styles.tab, pressed && styles.pressed]}
            >
              <Ionicons
                name={
                  (active
                    ? tab.activeIcon
                    : tab.icon) as keyof typeof Ionicons.glyphMap
                }
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
    elevation: 12,
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

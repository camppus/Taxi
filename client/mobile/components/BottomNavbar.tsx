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
    route: "/viagens",
    icon: "navigate-outline",
    activeIcon: "navigate",
  },
  {
    name: "Reservas",
    route: "/bookings",
    icon: "car-outline",
    activeIcon: "car",
  },
  {
    name: "Carteiras",
    route: "/carteiras",
    icon: "wallet-outline",
    activeIcon: "wallet",
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
                color={active ? "#ffffff" : "#999999"}
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
    backgroundColor: "#151519",
    borderRadius: 42,

    flexDirection: "row",
    alignItems: "center",

    paddingHorizontal: 8,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.25,
    shadowRadius: 15,
    elevation: 10,
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
    color: "#ffffff",
    fontWeight: "500",
  },
});

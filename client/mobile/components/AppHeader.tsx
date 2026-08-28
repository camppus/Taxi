import { Ionicons } from "@expo/vector-icons";
import {
  Animated,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import color from "@/styles/color";
import { UserRole } from "@/types/User";

type AppHeaderProps = {
  onMenuPress?: () => void;
  userRole: UserRole;
};

type MenuItem = {
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  route: string;
};

export default function AppHeader({ onMenuPress, userRole }: AppHeaderProps) {
  const router = useRouter();
  const menuItems: Record<UserRole, MenuItem[]> = {
    DRIVER: [
      {
        label: "Início",
        icon: "home-outline",
        route: "/(driver)",
      },
      {
        label: "Minhas viagens",
        icon: "car-outline",
        route: "/(driver)/bookings",
      },
      {
        label: "Conversas",
        icon: "chatbubbles-outline",
        route: "/(driver)/conversation",
      },
      {
        label: "Veículos",
        route: "/(driver)/vehicles",
        icon: "bicycle-outline",
      },
      {
        label: "Documentos",
        route: "/(driver)/verification/documents",
        icon: "document-attach-outline",
      },
      {
        label: "Avaliações",
        icon: "star-outline",
        route: "/(driver)/reviews",
      },
      {
        label: "Reclamações",
        icon: "alert-circle-outline",
        route: "/(driver)/complaints",
      },
      {
        label: "Perfil",
        icon: "person-outline",
        route: "/(driver)/profile",
      },
      {
        label: "Ajuda e suporte",
        icon: "help-circle-outline",
        route: "/(driver)/help",
      },
    ],
    PASSAGER: [
      {
        label: "Início",
        icon: "home-outline",
        route: "/(passenger)",
      },
      {
        label: "Minhas viagens",
        icon: "car-outline",
        route: "/(passenger)/bookings",
      },
      {
        label: "Conversas",
        icon: "chatbubbles-outline",
        route: "/(passenger)/conversation",
      },
      {
        label: "Avaliações",
        icon: "star-outline",
        route: "/(passenger)/reviews",
      },
      {
        label: "Reclamações",
        icon: "alert-circle-outline",
        route: "/(passenger)/complaints",
      },
      {
        label: "Perfil",
        icon: "person-outline",
        route: "/(passenger)/profile",
      },
      {
        label: "Ajuda e suporte",
        icon: "help-circle-outline",
        route: "/(passenger)/help",
      },
    ],
  };
  const userMenu = menuItems[userRole];
  const [menuVisible, setMenuVisible] = useState(false);

  const slideAnim = useRef(new Animated.Value(320)).current;
  const overlayAnim = useRef(new Animated.Value(0)).current;

  const openMenu = () => {
    setMenuVisible(true);

    onMenuPress?.();

    Animated.parallel([
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
        damping: 20,
        stiffness: 180,
        mass: 0.8,
      }),

      Animated.timing(overlayAnim, {
        toValue: 1,
        duration: 220,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const closeMenu = (callback?: () => void) => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 320,
        duration: 220,
        useNativeDriver: true,
      }),

      Animated.timing(overlayAnim, {
        toValue: 0,
        duration: 180,
        useNativeDriver: true,
      }),
    ]).start(({ finished }) => {
      if (finished) {
        setMenuVisible(false);
        callback?.();
      }
    });
  };

  const handleNavigate = (route: string) => {
    closeMenu(() => {
      router.push(route as any);
    });
  };

  return (
    <>
      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <View style={styles.logoMark}>
            <Image
              source={require("../assets/images/logo.png")}
              style={{
                width: 40,
                height: 40,
              }}
            />
          </View>

          <Text style={styles.logoText}>
            Manda<Text style={styles.logoAccent}>Vir</Text>
          </Text>
        </View>

        <View style={styles.headerActions}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Notificações"
            onPress={() =>
              router.push(
                `/${userRole === UserRole.DRIVER ? "(driver)" : "(passenger)"}/notifications` as any,
              )
            }
            style={({ pressed }) => [
              styles.notificationButton,
              pressed && styles.menuPressed,
            ]}
          >
            <Ionicons name="notifications-outline" size={23} color="#111827" />
            <View style={styles.notificationBadge} />
          </Pressable>
          <Pressable
            onPress={openMenu}
            style={({ pressed }) => [
              styles.menuButton,
              pressed && styles.menuPressed,
            ]}
          >
            <Ionicons name="menu-outline" size={25} color="#111827" />
          </Pressable>
        </View>
      </View>

      {/* OVERLAY */}
      {menuVisible && (
        <Animated.View
          style={[
            styles.overlayContainer,
            {
              opacity: overlayAnim,
            },
          ]}
        >
          <Pressable
            style={StyleSheet.absoluteFill}
            onPress={() => closeMenu()}
          />
        </Animated.View>
      )}

      {/* MENU */}
      {menuVisible && (
        <Animated.View
          style={[
            styles.menu,
            {
              transform: [
                {
                  translateX: slideAnim,
                },
              ],
            },
          ]}
        >
          {/* HEADER DO MENU */}
          <View style={styles.menuHeader}>
            <View style={styles.profileAvatar}>
              <Ionicons name="person" size={24} color={color.root.secondary} />
            </View>

            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>Olá, Francisco</Text>

              <Text style={styles.profileSubtitle}>
                {userRole == UserRole.DRIVER ? "Mototista" : "Passageiro"}
              </Text>
            </View>

            <Pressable style={styles.closeButton} onPress={() => closeMenu()}>
              <Ionicons name="close" size={21} color={color.root.textTint} />
            </Pressable>
          </View>

          <View style={styles.divider} />

          <View style={styles.menuItems}>
            {userMenu.map((item) => (
              <Pressable
                key={item.label}
                style={({ pressed }) => [
                  styles.menuItem,
                  pressed && styles.menuItemPressed,
                ]}
                onPress={() => handleNavigate(item.route)}
              >
                <View style={styles.menuIcon}>
                  <Ionicons
                    name={item.icon}
                    size={20}
                    color={color.root.textTint}
                  />
                </View>

                <Text style={styles.menuLabel}>{item.label}</Text>

                <Ionicons name="chevron-forward" size={17} color="#B8B8B8" />
              </Pressable>
            ))}
          </View>

          {/* BOTTOM */}
          <View style={styles.menuBottom}>
            <Pressable style={styles.logoutButton}>
              <View style={styles.logoutIcon}>
                <Ionicons name="log-out-outline" size={20} color="#D14343" />
              </View>

              <Text style={styles.logoutText}>Terminar sessão</Text>
            </Pressable>

            <Text style={styles.version}>MandaVir · v1.0.0</Text>
          </View>
        </Animated.View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#F5F5F5",
    backgroundColor: color.root.primary,
    zIndex: 10,
  },

  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 9,
  },

  logoMark: {
    alignItems: "center",
    justifyContent: "center",
  },

  logoText: {
    fontSize: 21,
    fontWeight: "700",
    color: "#111827",
    letterSpacing: -0.7,
  },

  logoAccent: {
    color: color.root.green,
  },

  menuButton: {
    width: 44,
    height: 44,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },

  headerActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },

  notificationButton: {
    width: 44,
    height: 44,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },

  notificationBadge: {
    position: "absolute",
    top: 9,
    right: 9,
    width: 8,
    height: 8,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: color.root.primary,
    backgroundColor: "#E74C3C",
  },

  menuPressed: {
    opacity: 0.65,
    transform: [{ scale: 0.96 }],
  },

  overlayContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 20,
    backgroundColor: "rgba(0,0,0,0.35)",
  },

  menu: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,

    width: 300,

    backgroundColor: color.root.primary,

    zIndex: 30,
    paddingTop: 25,
    paddingHorizontal: 10,
  },

  menuHeader: {
    flexDirection: "row",
    alignItems: "center",
  },

  profileAvatar: {
    width: 48,
    height: 48,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },

  profileInfo: {
    flex: 1,
    marginLeft: 12,
  },

  profileName: {
    fontSize: 15,
    fontWeight: "800",
    color: color.root.secondary,
  },

  profileSubtitle: {
    marginTop: 3,
    fontSize: 12,
    color: color.root.textTint,
  },

  closeButton: {
    width: 38,
    height: 38,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },

  divider: {
    height: 1,
    backgroundColor: "#EEEEEE",
    marginVertical: 12,
  },

  menuItems: {
    gap: 4,
  },

  menuItem: {
    height: 52,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    borderRadius: 14,
  },

  menuItemPressed: {
    backgroundColor: "#F4F5F5",
  },

  menuIcon: {
    width: 38,
    height: 38,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },

  menuLabel: {
    flex: 1,
    marginLeft: 12,
    fontSize: 14,
    fontWeight: "700",
    color: color.root.secondary,
  },

  menuBottom: {
    marginTop: "auto",
    paddingBottom: 25,
  },

  logoutButton: {
    height: 52,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    borderRadius: 14,
    backgroundColor: "#FFF5F5",
  },

  logoutIcon: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: "#FFEAEA",
    alignItems: "center",
    justifyContent: "center",
  },

  logoutText: {
    marginLeft: 12,
    fontSize: 14,
    fontWeight: "700",
    color: "#D14343",
  },

  version: {
    textAlign: "center",
    marginTop: 18,
    fontSize: 10,
    color: "#A8A8A8",
  },
});

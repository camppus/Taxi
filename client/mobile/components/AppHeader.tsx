import { Ionicons } from "@expo/vector-icons";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import color from "@/styles/color";

type AppHeaderProps = {
  onMenuPress?: () => void;
};

export default function AppHeader({ onMenuPress }: AppHeaderProps) {
  return (
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

      <Pressable
        onPress={onMenuPress}
        style={({ pressed }) => [
          styles.menuButton,
          pressed && styles.menuPressed,
        ]}
      >
        <Ionicons name="menu-outline" size={25} color="#111827" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: "100%",

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 18,
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

  logoMarkText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "800",
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

    backgroundColor: "#F3F4F6",

    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  menuPressed: {
    opacity: 0.65,
    transform: [{ scale: 0.96 }],
  },
});

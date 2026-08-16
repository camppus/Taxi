import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import Animated, {
  Easing,
  FadeIn,
  FadeInDown,
  FadeInUp,
  ZoomIn,
} from "react-native-reanimated";

import color from "@/styles/color";
import SplashScreen from "@/components/SplashScrenn";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function App() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!loading) {
      // Nada aqui por enquanto.
      // As animações de entrada são controladas pelos entering animations.
    }
  }, [loading]);

  if (loading) {
    return <SplashScreen onFinish={() => setLoading(false)} />;
  }

  return (
    <View style={styles.container}>
      <StatusBar style="dark" translucent={false} />

      {/* Background decoration */}
      <View style={styles.backgroundCircleOne} />
      <View style={styles.backgroundCircleTwo} />

      {/* HERO */}
      <Animated.View
        entering={ZoomIn.duration(700).easing(Easing.out(Easing.cubic))}
        style={styles.hero}
      >
        <Image
          source={require("../assets/images/firstimaji.png")}
          style={styles.image}
        />
      </Animated.View>

      {/* CONTENT */}
      <Animated.View
        entering={FadeInUp.duration(700)
          .delay(150)
          .easing(Easing.out(Easing.cubic))}
        style={styles.content}
      >
        <View style={styles.badge}>
          <View style={styles.badgeDot} />

          <Text style={styles.badgeText}>Mobilidade simples e segura</Text>
        </View>

        <Text style={styles.title}>
          Viaje melhor.
          {"\n"}
          <Text style={styles.titleAccent}>Chegue mais longe.</Text>
        </Text>

        <Text style={styles.description}>
          Solicite uma viagem, acompanhe o motorista em tempo real e chegue ao
          seu destino com conforto e segurança.
        </Text>
      </Animated.View>

      {/* ACTIONS */}
      <Animated.View
        entering={FadeInDown.duration(700)
          .delay(350)
          .easing(Easing.out(Easing.cubic))}
        style={styles.actions}
      >
        <AnimatedPressable
          entering={FadeInDown.duration(600).delay(450)}
          style={styles.primaryButton}
          onPress={() => router.push("/(auth)/login")}
        >
          <Text style={styles.primaryText}>Acessar conta</Text>

          <View style={styles.arrow}>
            <Text style={styles.arrowText}>→</Text>
          </View>
        </AnimatedPressable>

        <AnimatedPressable
          entering={FadeInDown.duration(600).delay(550)}
          style={styles.secondaryButton}
          onPress={() => router.push("/(auth)/register")}
        >
          <Text style={styles.secondaryText}>Criar uma conta</Text>
        </AnimatedPressable>
      </Animated.View>

      {/* FOOTER */}
      <Animated.Text
        entering={FadeIn.duration(700).delay(700)}
        style={styles.footer}
      >
        Transporte urbano feito para você
      </Animated.Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    paddingHorizontal: 24,
    overflow: "hidden",
  },

  backgroundCircleOne: {
    position: "absolute",
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: "#F4F5F7",
    top: -150,
    right: -100,
  },

  backgroundCircleTwo: {
    position: "absolute",
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: "#F8F8F8",
    bottom: -80,
    left: -80,
  },

  hero: {
    width: "100%",
    alignItems: "center",
    marginTop: 55,
  },

  image: {
    width: 330,
    height: 280,
    resizeMode: "contain",
  },

  content: {
    width: "100%",
    alignItems: "center",
    marginTop: 5,
  },

  badge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    paddingHorizontal: 13,
    paddingVertical: 7,
    borderRadius: 30,
    backgroundColor: "#F5F5F5",
    marginBottom: 17,
  },

  badgeDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: "#2ECC71",
  },

  badgeText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#777777",
  },

  title: {
    fontSize: 36,
    lineHeight: 42,
    fontWeight: "900",
    color: color.root.textTint,
    textAlign: "center",
    letterSpacing: -1,
  },

  titleAccent: {
    color: color.root.secondary,
  },

  description: {
    marginTop: 14,
    maxWidth: 340,
    fontSize: 14,
    lineHeight: 21,
    color: "#8A8A8A",
    textAlign: "center",
  },

  actions: {
    width: "100%",
    marginTop: 30,
    gap: 11,
  },

  primaryButton: {
    width: "100%",
    height: 58,
    borderRadius: 30,
    backgroundColor: color.root.secondary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 5,
  },

  primaryText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "800",
  },

  arrow: {
    position: "absolute",
    right: 7,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(255,255,255,0.14)",
    alignItems: "center",
    justifyContent: "center",
  },

  arrowText: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "600",
  },

  secondaryButton: {
    width: "100%",
    height: 58,
    borderRadius: 30,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E5E5",
    alignItems: "center",
    justifyContent: "center",
  },

  secondaryText: {
    color: color.root.secondary,
    fontSize: 15,
    fontWeight: "800",
  },

  footer: {
    position: "absolute",
    bottom: 20,
    fontSize: 10,
    color: "#A5A5A5",
    fontWeight: "600",
  },
});

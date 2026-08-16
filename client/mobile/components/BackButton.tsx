import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface BackButtonProps {
  title?: string;
}

export default function BackButton({ title = "Voltar" }: BackButtonProps) {
  const router = useRouter();
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  function handlePress() {
    router.back();
  }

  return (
    <AnimatedPressable
      onPress={handlePress}
      onPressIn={() => {
        scale.value = withSpring(0.96, {
          damping: 15,
          stiffness: 300,
        });
      }}
      onPressOut={() => {
        scale.value = withSpring(1, {
          damping: 15,
          stiffness: 300,
        });
      }}
      style={[styles.button, animatedStyle]}
    >
      <Ionicons name="arrow-back" size={18} color="#151519" />

      <Text style={styles.text}>{title}</Text>
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 50,
    width: "100%",
    borderRadius: 26,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",

    gap: 8,

    backgroundColor: "#F5F5F5",
    borderWidth: 1,
    borderColor: "#E9E9E9",
  },

  text: {
    fontSize: 14,
    fontWeight: "700",
    color: "#151519",
  },
});

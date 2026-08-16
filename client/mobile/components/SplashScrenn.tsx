import { Text, View } from "react-native";
import color from "@/styles/color";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { useFonts, Inter_700Bold } from "@expo-google-fonts/inter";
import { useEffect } from "react";
export default function SplashScreen({ onFinish }: { onFinish(): void }) {
  const scale = useSharedValue(1);
  const [loaded] = useFonts({
    Inter_700Bold,
  });

  useEffect(() => {
    scale.value = withRepeat(withTiming(1.15, { duration: 1000 }), -1, true);
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: scale.value,
      },
    ],
  }));

  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (!loaded) {
    return null;
  }

  return (
    <View
      style={{
        backgroundColor: color.root.secondary,
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        gap: 12,
        height: "100%",
      }}
    >
      <Animated.Image
        source={require("../assets/images/logo.png")}
        style={[
          {
            width: 60,
            height: 60,
          },
          animatedStyle,
        ]}
      />

      <Text
        style={{
          fontSize: 35,
          color: color.root.primary,
          fontFamily: "Inter_600Bold",
        }}
      >
        TáxiPlus
      </Text>
    </View>
  );
}

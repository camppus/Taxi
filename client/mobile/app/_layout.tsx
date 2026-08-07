import SplashScreen from "@/components/SplashScrenn";
import { Stack } from "expo-router";
import { useState } from "react";

export default function RootLayout() {
  const [loading, setLoading] = useState(true);

  if (loading) {
    return <SplashScreen onFinish={() => setLoading(false)} />;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
      }}
    />
  );
}

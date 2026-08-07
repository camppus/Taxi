import { useEffect, useState } from "react";
import { Text } from "react-native";

export default function Timer() {
  const [seconds, setSeconds] = useState(60);

  useEffect(() => {
    if (seconds <= 0) return;

    const timer = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [seconds]);

  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;

  return (
    <Text
      style={{
        fontSize: 20,
        fontWeight: "600",
      }}
    >
      {String(minutes).padStart(2, "0")}:{String(secs).padStart(2, "0")}
    </Text>
  );
}

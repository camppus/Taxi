import color from "@/styles/color";
import { Pressable, Text, View } from "react-native";

interface OTPKeyboardProps {
  value: string;
  onChange(value: string): void;
}

export default function OTPKeyboard({ value, onChange }: OTPKeyboardProps) {
  function handlePress(number: string) {
    if (value.length >= 6) return;

    onChange(value + number);
  }

  function handleDelete() {
    onChange(value.slice(0, -1));
  }

  const keys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "", "0", "⌫"];

  return (
    <View
      style={{
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        rowGap: 12,
      }}
    >
      {keys.map((key, index) => {
        if (key === "") {
          return <View key={index} style={{ width: "30%" }} />;
        }

        return (
          <Pressable
            key={index}
            style={{
              width: "30%",
              aspectRatio: 1.5,
              borderRadius: 999,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: key === "⌫" ? color.root.secondary : "",
            }}
            onPress={() => (key === "⌫" ? handleDelete() : handlePress(key))}
          >
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 28,
                  fontWeight: "600",
                  color: key === "⌫" ? "#fff" : color.root.secondary,
                }}
              >
                {key}
              </Text>
            </View>
          </Pressable>
        );
      })}
    </View>
  );
}

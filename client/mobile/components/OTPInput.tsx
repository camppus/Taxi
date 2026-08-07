import { View, TextInput, StyleSheet } from "react-native";
import { useRef } from "react";

interface OTPInputProps {
  value: string;
  onChange(value: string): void;
  processing: boolean;
}

export default function OTPInput({
  value,
  onChange,
  processing,
}: OTPInputProps) {
  const inputs = useRef<TextInput[]>([]);

  function handleChange(text: string, index: number) {
    const newValue = value.split("");

    newValue[index] = text;

    const otp = newValue.join("").slice(0, 5);

    onChange(otp);

    if (text && index < 5) {
      inputs.current[index + 1]?.focus();
    }
  }

  return (
    <View
      style={{
        flexDirection: "row",
        gap: 10,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {Array.from({ length: 5 }).map((_, index) => (
        <TextInput
          key={index}
          ref={(ref) => {
            if (ref) inputs.current[index] = ref;
          }}
          value={value[index] ?? ""}
          onChangeText={(text) => handleChange(text, index)}
          keyboardType="number-pad"
          maxLength={1}
          style={[styles.input, processing && styles.inputDisabled]}
          textAlign="center"
          editable={!processing}
          selectTextOnFocus={!processing}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    width: 50,
    height: 55,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 16,
    fontSize: 22,
    fontWeight: "700",
  },
  inputDisabled: {
    opacity: 0.5,
  },
});

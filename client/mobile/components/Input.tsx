import { TextInput, TextInputProps } from "react-native";

export interface InputProps extends Omit<TextInputProps, "onChange"> {
  onChange(data: string): void;
}

const input = {
  height: 55,
  borderWidth: 1,
  borderRadius: 18,
  paddingHorizontal: 16,
  borderColor: "#ddd",
};

export default function Input({ onChange, ...props }: InputProps) {
  return (
    <TextInput
      {...props}
      onChangeText={onChange}
      style={input}
      placeholderTextColor="#999"
    />
  );
}

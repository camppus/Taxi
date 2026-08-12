import { Text, View } from "react-native";

export const label = {
  fontSize: 16,
  fontWeight: "600" as const,
  color: "#333",
};

export default function Lable({ title }: { title: string }) {
  return <Text style={label}>{title}</Text>;
}

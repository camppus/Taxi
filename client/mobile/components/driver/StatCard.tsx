import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import color from "@/styles/color";

const { width } = Dimensions.get("window");

const CARD_WIDTH = (width - 32 - 8) / 2;

interface Props {
  icon: keyof typeof Ionicons.glyphMap;
  value: string;
  label: string;
}

export default function StatCard({ icon, value, label }: Props) {
  return (
    <View style={styles.container}>
      <Ionicons name={icon} size={18} color={color.root.green} />
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: CARD_WIDTH,
    backgroundColor: "#fff",
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#F0F0F2",
  },
  value: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1C1C1E",
    marginTop: 8,
  },
  label: {
    fontSize: 11,
    color: "#8E8E93",
    marginTop: 2,
  },
});

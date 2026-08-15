import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface Props {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

export default function SectionCard({ title, subtitle, children }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      <View style={styles.body}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 22,
  },
  title: {
    fontSize: 15,
    fontWeight: "700",
    color: "#1C1C1E",
  },
  subtitle: {
    fontSize: 12,
    color: "#8E8E93",
    marginTop: 2,
  },
  body: {
    marginTop: 12,
  },
});

import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import color from "@/styles/color";

interface Option<T extends string> {
  value: T;
  label: string;
}

interface Props<T extends string> {
  options: Option<T>[];
  value: T | null;
  onChange: (value: T) => void;
  error?: boolean;
}

export default function ChipSelect<T extends string>({
  options,
  value,
  onChange,
  error,
}: Props<T>) {
  return (
    <View style={styles.row}>
      {options.map((option) => {
        const selected = option.value === value;
        return (
          <Pressable
            key={option.value}
            onPress={() => onChange(option.value)}
            style={[
              styles.chip,
              selected && styles.chipSelected,
              error && !value && styles.chipError,
            ]}
          >
            <Text
              style={[styles.chipText, selected && styles.chipTextSelected]}
            >
              {option.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  chip: {
    backgroundColor: "#F2F2F7",
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "transparent",
  },
  chipSelected: {
    backgroundColor: color.root.green,
  },
  chipError: {
    borderColor: "#DC2626",
  },
  chipText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#1C1C1E",
  },
  chipTextSelected: {
    color: "#fff",
  },
});

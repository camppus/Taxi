import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TextInputProps,
} from "react-native";

interface Props extends TextInputProps {
  label: string;
  required?: boolean;
  error?: boolean;
}

export default function FormInput({
  label,
  required,
  error,
  style,
  ...rest
}: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        {label}
        {required && <Text style={styles.required}> *</Text>}
      </Text>
      <TextInput
        placeholderTextColor="#AEAEB2"
        style={[styles.input, error && styles.inputError, style]}
        {...rest}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 14,
  },
  label: {
    fontSize: 13,
    fontWeight: "600",
    color: "#1C1C1E",
    marginBottom: 6,
  },
  required: {
    color: "#DC2626",
  },
  input: {
    backgroundColor: "#F2F2F7",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 11,
    fontSize: 14,
    color: "#1C1C1E",
    borderWidth: 1,
    borderColor: "transparent",
  },
  inputError: {
    borderColor: "#DC2626",
  },
});

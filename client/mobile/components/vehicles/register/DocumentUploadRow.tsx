import React from "react";
import { View, Text, StyleSheet, Pressable, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";
import color from "@/styles/color";

export interface PickedDocument {
  name: string;
  uri: string;
  expiresAt: string;
}

interface Props {
  label: string;
  required?: boolean;
  requiresExpiry?: boolean;
  value: PickedDocument | null;
  onChange: (doc: PickedDocument | null) => void;
  error?: boolean;
}

export default function DocumentUploadRow({
  label,
  required,
  requiresExpiry = true,
  value,
  onChange,
  error,
}: Props) {
  async function handlePick() {
    const result = await DocumentPicker.getDocumentAsync({
      type: ["image/*", "application/pdf"],
      copyToCacheDirectory: true,
    });

    if (result.canceled) return;

    const file = result.assets[0];
    onChange({
      name: file.name,
      uri: file.uri,
      expiresAt: value?.expiresAt ?? "",
    });
  }

  return (
    <View style={styles.container}>
      <View style={styles.labelRow}>
        <Text style={styles.label}>
          {label}
          {required && <Text style={styles.required}> *</Text>}
        </Text>
        {value && (
          <Ionicons
            name="checkmark-circle"
            size={16}
            color={color.root.green}
          />
        )}
      </View>

      <Pressable
        onPress={handlePick}
        style={[styles.uploadBox, error && styles.uploadBoxError]}
      >
        <Ionicons
          name={value ? "document-text-outline" : "cloud-upload-outline"}
          size={18}
          color={value ? color.root.green : "#8E8E93"}
        />
        <Text style={styles.uploadText} numberOfLines={1}>
          {value ? value.name : "Toque para anexar (PDF ou imagem)"}
        </Text>
        {value && (
          <Pressable hitSlop={8} onPress={() => onChange(null)}>
            <Ionicons name="close-circle" size={18} color="#C7C7CC" />
          </Pressable>
        )}
      </Pressable>

      {requiresExpiry && value && (
        <View style={styles.expiryRow}>
          <Ionicons name="calendar-outline" size={14} color="#8E8E93" />
          <TextInput
            value={value.expiresAt}
            onChangeText={(text) => onChange({ ...value, expiresAt: text })}
            placeholder="Validade (DD/MM/AAAA)"
            placeholderTextColor="#AEAEB2"
            keyboardType="numbers-and-punctuation"
            style={styles.expiryInput}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 14,
  },
  labelRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  label: {
    fontSize: 13,
    fontWeight: "600",
    color: "#1C1C1E",
  },
  required: {
    color: "#DC2626",
  },
  uploadBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F2F2F7",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "transparent",
    gap: 8,
  },
  uploadBoxError: {
    borderColor: "#DC2626",
  },
  uploadText: {
    flex: 1,
    fontSize: 13,
    color: "#1C1C1E",
  },
  expiryRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    gap: 6,
    paddingHorizontal: 4,
  },
  expiryInput: {
    flex: 1,
    fontSize: 13,
    color: "#1C1C1E",
    paddingVertical: 4,
  },
});

import React from "react";
import { View, Text, StyleSheet, Pressable, Linking } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { VehicleDocument } from "@/types/Vehicle";
import {
  formatDate,
  isDocumentExpiringSoon,
  isDocumentExpired,
} from "@/util/vehicle";
import color from "@/styles/color";

interface Props {
  label: string;
  document?: VehicleDocument;
}

export default function DocumentRow({ label, document }: Props) {
  const expired = document?.expiresAt
    ? isDocumentExpired(document.expiresAt)
    : false;
  const expiringSoon = document?.expiresAt
    ? isDocumentExpiringSoon(document.expiresAt)
    : false;

  return (
    <View style={styles.container}>
      <View style={styles.iconWrap}>
        <Ionicons
          name={document ? "document-text" : "document-outline"}
          size={18}
          color={document ? color.root.green : "#C7C7CC"}
        />
      </View>

      <View style={styles.info}>
        <Text style={styles.label}>{label}</Text>
        {document?.expiresAt ? (
          <Text
            style={[
              styles.expiry,
              expired && styles.expiryExpired,
              !expired && expiringSoon && styles.expiryWarning,
            ]}
          >
            {expired
              ? `Expirou em ${formatDate(document.expiresAt)}`
              : `Válido até ${formatDate(document.expiresAt)}`}
          </Text>
        ) : document ? (
          <Text style={styles.expiry}>Sem data de validade</Text>
        ) : (
          <Text style={styles.missing}>Não enviado</Text>
        )}
      </View>

      {document && (
        <Pressable
          hitSlop={8}
          onPress={() => Linking.openURL(document.fileUrl[0])}
        >
          <Ionicons name="eye-outline" size={20} color="#8E8E93" />
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  iconWrap: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: "#F2F2F7",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  info: {
    flex: 1,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1C1C1E",
  },
  expiry: {
    fontSize: 12,
    color: "#8E8E93",
    marginTop: 2,
  },
  expiryWarning: {
    color: "#D97706",
    fontWeight: "600",
  },
  expiryExpired: {
    color: "#DC2626",
    fontWeight: "600",
  },
  missing: {
    fontSize: 12,
    color: "#DC2626",
    marginTop: 2,
  },
});

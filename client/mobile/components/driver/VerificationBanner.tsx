import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import color from "@/styles/color";

interface Props {
  pending: boolean;
  onPress: () => void;
}

export default function VerificationBanner({ pending, onPress }: Props) {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <View style={styles.iconWrap}>
        <Ionicons
          name={pending ? "time-outline" : "alert-circle"}
          size={20}
          color="#fff"
        />
      </View>

      <View style={styles.textWrap}>
        <Text style={styles.title}>
          {pending ? "Documentos em análise" : "Verificação pendente"}
        </Text>
        <Text style={styles.subtitle}>
          {pending
            ? "Estamos a validar os seus documentos. Isto pode levar até 24h."
            : "Envie seus documentos para começar a receber viagens."}
        </Text>
      </View>

      {!pending && <Ionicons name="chevron-forward" size={18} color="#fff" />}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5b31b",
    borderRadius: 16,
    padding: 12,
    marginHorizontal: 16,
    marginTop: 4,
  },
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  textWrap: {
    flex: 1,
  },
  title: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "700",
  },
  subtitle: {
    color: "rgba(255,255,255,0.9)",
    fontSize: 12,
    marginTop: 2,
  },
});

import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import colors from "@/styles/color";

type LoadingProps = {
  subtitle?: string;
};

export function Loading({ subtitle = "A carregar..." }: LoadingProps) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={colors.root.green} />

      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
    backgroundColor: colors.root.primary,
  },

  subtitle: {
    marginTop: 12,
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
    color: colors.root.textTint,
  },
});

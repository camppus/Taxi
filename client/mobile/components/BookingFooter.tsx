import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";

import colors from "@/styles/color";
import { BookingStatus } from "@/types/Bookings";

type BookingFooterProps = {
  status: BookingStatus;
  onCancel?: () => void;
  onChat?: () => void;
  onCall?: () => void;
  onBack?: () => void;
};

export function BookingFooter({
  status,
  onCancel,
  onChat,
  onCall,
  onBack,
}: BookingFooterProps) {
  const canCancel =
    status === "PENDING" ||
    status === "PENDING_PAYMENT" ||
    status === "AWAITING_CONFIRMATION" ||
    status === "CONFIRMED";

  const canChat = status === "CONFIRMED" || status === "IN_TRIP";

  const canCall = status === "CONFIRMED" || status === "IN_TRIP";

  return (
    <View style={styles.container}>
      {/* CANCELAR */}
      {canCancel && (
        <Pressable
          style={({ pressed }) => [
            styles.cancelButton,
            pressed && styles.pressed,
          ]}
          onPress={onCancel}
        >
          <Ionicons name="close-circle-outline" size={20} color="#D14343" />

          <Text style={styles.cancelText}>Cancelar</Text>
        </Pressable>
      )}

      {/* CHAT */}
      {canChat && (
        <Pressable
          style={({ pressed }) => [
            styles.actionButton,
            pressed && styles.pressed,
          ]}
          onPress={onChat}
        >
          <Ionicons
            name="chatbubble-ellipses-outline"
            size={21}
            color={colors.root.secondary}
          />

          <Text style={styles.actionText}>Chat</Text>
        </Pressable>
      )}

      {/* LIGAR */}
      {canCall && (
        <Pressable
          style={({ pressed }) => [
            styles.actionButton,
            pressed && styles.pressed,
          ]}
          onPress={onCall}
        >
          <Ionicons
            name="call-outline"
            size={21}
            color={colors.root.secondary}
          />

          <Text style={styles.actionText}>Ligar</Text>
        </Pressable>
      )}

      {/* VOLTAR */}
      <Pressable
        style={({ pressed }) => [styles.backButton, pressed && styles.pressed]}
        onPress={onBack}
      >
        <Ionicons name="arrow-back" size={20} color={colors.root.primary} />

        <Text style={styles.backText}>Voltar</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    paddingTop: 12,
  },

  actionButton: {
    height: 48,
    width: "48%",
    paddingHorizontal: 12,
    borderRadius: 14,
    backgroundColor: "#F3F4F4",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 6,
  },

  actionText: {
    fontSize: 12,
    fontWeight: "800",
    color: colors.root.secondary,
  },

  cancelButton: {
    height: 48,
    width: "48%",
    paddingHorizontal: 12,
    borderRadius: 14,
    backgroundColor: "#FFF0F0",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 6,
  },

  cancelText: {
    fontSize: 12,
    fontWeight: "800",
    color: "#D14343",
  },

  backButton: {
    height: 48,
    width: "48%",
    paddingHorizontal: 12,
    borderRadius: 14,
    backgroundColor: colors.root.secondary,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 7,
  },

  backText: {
    fontSize: 13,
    fontWeight: "800",
    color: colors.root.primary,
  },

  pressed: {
    opacity: 0.7,
    transform: [{ scale: 0.97 }],
  },
});

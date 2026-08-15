import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import colors from "@/styles/color";
import { formatDate } from "@/util/date";

type DatePickerProps = {
  value: Date | null;
  onChange: (date: Date) => void;
  label?: string;
  placeholder?: string;
  minimumDate?: Date;
  mode?: "date" | "time" | "datetime";
};

export default function DatePicker({
  value,
  onChange,
  label = "DATA",
  placeholder = "Selecionar data",
  minimumDate,
  mode = "datetime",
}: DatePickerProps) {
  const [visible, setVisible] = useState(false);
  const [draftValue, setDraftValue] = useState<Date>(value ?? new Date());

  const openPicker = () => {
    setDraftValue(value ?? new Date());
    setVisible(true);
  };

  const handleChange = (_event: any, selected?: Date) => {
    if (Platform.OS === "android") {
      setVisible(false);
      if (selected) onChange(selected);
      return;
    }
    if (selected) setDraftValue(selected);
  };

  const handleConfirm = () => {
    onChange(draftValue);
    setVisible(false);
  };

  return (
    <>
      <TouchableOpacity
        style={styles.dateBox}
        activeOpacity={0.7}
        onPress={openPicker}
      >
        <Text style={styles.label}>{label}</Text>
        <View style={styles.dateValueRow}>
          <Ionicons
            name="calendar-outline"
            size={16}
            color={colors.root.green}
          />
          <View style={{ marginLeft: 6 }}>
            <Text
              style={[styles.dateValueText, !value && styles.placeholderText]}
              numberOfLines={1}
            >
              {formatDate(value ?? new Date())}
            </Text>
          </View>
        </View>
      </TouchableOpacity>

      <Modal
        visible={visible}
        animationType="slide"
        transparent
        onRequestClose={() => setVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.datePickerSheet}>
            <View style={styles.modalHandle} />

            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Data e hora da viagem</Text>
              <TouchableOpacity onPress={() => setVisible(false)} hitSlop={10}>
                <Ionicons name="close" size={22} color={colors.root.textTint} />
              </TouchableOpacity>
            </View>

            <View style={styles.datePickerWrapper}>
              <RNDateTimePicker
                value={draftValue}
                mode={mode}
                minimumDate={minimumDate}
                display={Platform.OS === "ios" ? "spinner" : "default"}
                onChange={handleChange}
                themeVariant="light"
                textColor={colors.root.secondary}
                style={styles.datePicker}
              />
            </View>

            {Platform.OS === "ios" && (
              <TouchableOpacity
                style={styles.confirmDateButton}
                onPress={handleConfirm}
                activeOpacity={0.85}
              >
                <Text style={styles.confirmDateButtonText}>Confirmar</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  dateBox: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 16,
    backgroundColor: "#FAFAFA",
    padding: 12,
    justifyContent: "center",
  },
  label: {
    fontSize: 10,
    fontWeight: "800",
    color: colors.root.textTint,
    letterSpacing: 0.8,
    marginBottom: 3,
  },
  dateValueRow: { flexDirection: "row", alignItems: "center", marginTop: 6 },
  dateValueText: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.root.secondary,
  },
  placeholderText: { color: "#A0A0A0", fontWeight: "500" },
  dateTimeText: { fontSize: 11, color: colors.root.textTint, marginTop: 1 },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.35)",
    justifyContent: "flex-end",
  },
  datePickerSheet: {
    backgroundColor: colors.root.primary,
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 30,
  },
  modalHandle: {
    width: 42,
    height: 4,
    borderRadius: 10,
    backgroundColor: "#D8D8D8",
    alignSelf: "center",
    marginBottom: 14,
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 14,
  },
  modalTitle: { fontSize: 17, fontWeight: "800", color: colors.root.secondary },

  datePickerWrapper: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FAFAFA",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    paddingVertical: 8,
  },
  datePicker: {
    width: "100%",
    height: Platform.OS === "ios" ? 200 : undefined,
  },
  confirmDateButton: {
    height: 54,
    borderRadius: 16,
    backgroundColor: colors.root.green,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
  },
  confirmDateButtonText: {
    color: colors.root.secondary,
    fontSize: 15,
    fontWeight: "800",
  },
});

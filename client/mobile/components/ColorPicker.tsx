import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import {
  ColorPicker as ReanimatedColorPicker,
  HueSlider,
  Panel1,
  Preview,
  
} from "reanimated-color-picker";

interface ColorPickerProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
}

export default function ColorPicker({
  value,
  onChange,
  label = "Cor",
}: ColorPickerProps) {
  const [inputValue, setInputValue] = useState(value);
  const [visible, setVisible] = useState(false);
  const [tempColor, setTempColor] = useState(value);

  useEffect(() => {
    setInputValue(value);
    setTempColor(value);
  }, [value]);

  const isValidHex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(
    inputValue.trim(),
  );

  function handleInputChange(text: string) {
    let normalized = text.toUpperCase();

    if (!normalized.startsWith("#")) {
      normalized = `#${normalized}`;
    }

    normalized = normalized.replace(/[^#A-F0-9]/g, "");

    if (normalized.length > 7) {
      normalized = normalized.slice(0, 7);
    }

    setInputValue(normalized);

    if (/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(normalized)) {
      setTempColor(normalized);
      onChange(normalized);
    }
  }

  function openPicker() {
    setTempColor(isValidHex ? inputValue : value);
    setVisible(true);
  }

  function handleColorChange({ hex }: { hex: string }) {
    setTempColor(hex);
  }

  function handleConfirm() {
    setInputValue(tempColor.toUpperCase());
    onChange(tempColor.toUpperCase());
    setVisible(false);
  }

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}

      <View style={styles.inputRow}>
        <Pressable
          onPress={openPicker}
          style={[
            styles.colorPreview,
            {
              backgroundColor: isValidHex ? inputValue : "#E5E7EB",
            },
          ]}
        >
          <Ionicons
            name="color-palette-outline"
            size={17}
            color={isValidHex ? getContrastColor(inputValue) : "#6B7280"}
          />
        </Pressable>

        <TextInput
          value={inputValue}
          onChangeText={handleInputChange}
          placeholder="#FFFFFF"
          placeholderTextColor="#9CA3AF"
          autoCapitalize="characters"
          maxLength={7}
          style={styles.input}
        />

        <Pressable onPress={openPicker} style={styles.pickButton}>
          <Ionicons name="color-filter-outline" size={18} color="#777" />
        </Pressable>
      </View>

      <Text
        style={[
          styles.helper,
          !isValidHex && inputValue.length > 1 && styles.error,
        ]}
      >
        {isValidHex ? "HEX válido" : "Introduz uma cor HEX válida"}
      </Text>

      <Modal
        visible={visible}
        transparent
        animationType="slide"
        onRequestClose={() => setVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <View>
                <Text style={styles.modalTitle}>Escolher cor</Text>

                <Text style={styles.modalSubtitle}>
                  Seleciona a cor do veículo
                </Text>
              </View>

              <Pressable
                onPress={() => setVisible(false)}
                style={styles.closeButton}
              >
                <Ionicons name="close" size={21} color="#333" />
              </Pressable>
            </View>

            <ReanimatedColorPicker
              value={tempColor}
              onChangeJS={handleColorChange}
              style={styles.picker}
            >
              <Panel1 style={styles.panel} />

              <HueSlider style={styles.hueSlider} />

              <Preview style={styles.preview} hideInitialColor />
            </ReanimatedColorPicker>

            <View style={styles.hexPreview}>
              <View
                style={[
                  styles.hexColor,
                  {
                    backgroundColor: tempColor,
                  },
                ]}
              />

              <Text style={styles.hexValue}>{tempColor.toUpperCase()}</Text>
            </View>

            <View style={styles.modalActions}>
              <Pressable
                onPress={() => setVisible(false)}
                style={styles.cancelButton}
              >
                <Text style={styles.cancelText}>Cancelar</Text>
              </Pressable>

              <Pressable onPress={handleConfirm} style={styles.confirmButton}>
                <Text style={styles.confirmText}>Usar esta cor</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

function getContrastColor(hex: string) {
  const clean = hex.replace("#", "");

  const full =
    clean.length === 3
      ? clean
          .split("")
          .map((char) => char + char)
          .join("")
      : clean;

  const r = parseInt(full.substring(0, 2), 16);
  const g = parseInt(full.substring(2, 4), 16);
  const b = parseInt(full.substring(4, 6), 16);

  const brightness = (r * 299 + g * 587 + b * 114) / 1000;

  return brightness > 155 ? "#111827" : "#FFFFFF";
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },

  label: {
    marginBottom: 7,
    fontSize: 12,
    fontWeight: "700",
    color: "#6B7280",
  },

  inputRow: {
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 8,
  },

  colorPreview: {
    width: 34,
    height: 34,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 9,
  },

  input: {
    flex: 1,
    height: "100%",
    paddingHorizontal: 5,
    fontSize: 14,
    fontWeight: "700",
    color: "#1C1C1E",
  },

  pickButton: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: "#F3F4F4",
    alignItems: "center",
    justifyContent: "center",
  },

  helper: {
    marginTop: 5,
    fontSize: 10,
    color: "#9CA3AF",
  },

  error: {
    color: "#D14343",
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "flex-end",
  },

  modalCard: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
    padding: 20,
    paddingBottom: 30,
  },

  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  modalTitle: {
    fontSize: 19,
    fontWeight: "900",
    color: "#1C1C1E",
  },

  modalSubtitle: {
    marginTop: 3,
    fontSize: 11,
    color: "#8E8E93",
  },

  closeButton: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: "#F3F4F4",
    alignItems: "center",
    justifyContent: "center",
  },

  picker: {
    width: "100%",
  },

  panel: {
    height: 250,
    borderRadius: 18,
  },

  hueSlider: {
    marginTop: 18,
    height: 36,
    borderRadius: 18,
  },

  preview: {
    marginTop: 18,
    height: 48,
    borderRadius: 14,
  },

  hexPreview: {
    marginTop: 18,
    height: 50,
    borderRadius: 14,
    backgroundColor: "#F8F9FA",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
  },

  hexColor: {
    width: 30,
    height: 30,
    borderRadius: 9,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    marginRight: 10,
  },

  hexValue: {
    fontSize: 14,
    fontWeight: "800",
    color: "#1C1C1E",
  },

  modalActions: {
    flexDirection: "row",
    gap: 9,
    marginTop: 18,
  },

  cancelButton: {
    flex: 1,
    height: 50,
    borderRadius: 14,
    backgroundColor: "#F3F4F4",
    alignItems: "center",
    justifyContent: "center",
  },

  cancelText: {
    fontSize: 13,
    fontWeight: "800",
    color: "#555",
  },

  confirmButton: {
    flex: 1,
    height: 50,
    borderRadius: 14,
    backgroundColor: "#151519",
    alignItems: "center",
    justifyContent: "center",
  },

  confirmText: {
    fontSize: 13,
    fontWeight: "800",
    color: "#FFFFFF",
  },
});

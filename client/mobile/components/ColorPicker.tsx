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

import ReanimatedColorPicker, {
  HueSlider,
  Panel1,
  Preview,
} from "reanimated-color-picker";

interface ColorPickerProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
}

const DEFAULT_COLOR = "#FFFFFF";

const HEX_REGEX = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;

export default function ColorPicker({
  value,
  onChange,
  label = "Cor",
}: ColorPickerProps) {
  const [inputValue, setInputValue] = useState(value || DEFAULT_COLOR);
  const [tempColor, setTempColor] = useState(value || DEFAULT_COLOR);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const color = normalizeHex(value);
    setInputValue(color);
    setTempColor(color);
  }, [value]);

  const isValidHex = HEX_REGEX.test(inputValue.trim());

  function normalizeHex(hex: string) {
    let normalized = hex.trim().toUpperCase();

    if (!normalized) {
      return DEFAULT_COLOR;
    }

    if (!normalized.startsWith("#")) {
      normalized = `#${normalized}`;
    }

    return normalized;
  }

  function handleInputChange(text: string) {
    let normalized = text.toUpperCase();

    if (!normalized.startsWith("#")) {
      normalized = `#${normalized}`;
    }

    normalized = normalized.replace(/[^#A-F0-9]/g, "");

    // Evita mais de 6 caracteres depois do #
    if (normalized.length > 7) {
      normalized = normalized.slice(0, 7);
    }

    setInputValue(normalized);

    // Só altera o valor real quando for HEX válido
    if (HEX_REGEX.test(normalized)) {
      setTempColor(normalized);
      onChange(normalized);
    }
  }

  function openPicker() {
    const currentColor = HEX_REGEX.test(inputValue)
      ? inputValue
      : HEX_REGEX.test(value)
        ? value
        : DEFAULT_COLOR;

    setTempColor(currentColor.toUpperCase());
    setVisible(true);
  }

  function handleCancel() {
    setTempColor(HEX_REGEX.test(value) ? value.toUpperCase() : DEFAULT_COLOR);

    setVisible(false);
  }

  function handleColorChange({ hex }: { hex: string }) {
    if (!hex) return;

    const normalized = hex.toUpperCase();

    setTempColor(normalized);
  }

  /**
   * Confirma a cor selecionada.
   */
  function handleConfirm() {
    const color = normalizeHex(tempColor);

    if (!HEX_REGEX.test(color)) {
      return;
    }

    setInputValue(color);
    setTempColor(color);
    onChange(color);

    setVisible(false);
  }

  return (
    <View style={styles.container}>
      {label ? <Text style={styles.label}>{label}</Text> : null}

      <Pressable
        onPress={openPicker}
        style={[
          styles.inputRow,
          {
            backgroundColor: value ? "" : "#F2F2F7",
          },
        ]}
      >
        <Pressable
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

        <Text>{value ? value : "Selecione uma cor"}</Text>
      </Pressable>

      <Modal
        visible={visible}
        transparent
        animationType="slide"
        onRequestClose={handleCancel}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            {/* HEADER */}
            <View style={styles.modalHeader}>
              <View>
                <Text style={styles.modalTitle}>Escolher cor</Text>

                <Text style={styles.modalSubtitle}>
                  Seleciona uma cor da sua escolha
                </Text>
              </View>

              <Pressable onPress={handleCancel} style={styles.closeButton}>
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

              <View style={styles.hexInfo}>
                <Text style={styles.hexLabel}>Cor selecionada</Text>

                <Text style={styles.hexValue}>{tempColor.toUpperCase()}</Text>
              </View>
            </View>

            {/* ACTIONS */}
            <View style={styles.modalActions}>
              <Pressable onPress={handleCancel} style={styles.cancelButton}>
                <Text style={styles.cancelText}>Cancelar</Text>
              </Pressable>

              <Pressable
                onPress={handleConfirm}
                style={[
                  styles.confirmButton,
                  {
                    backgroundColor: tempColor,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.confirmText,
                    {
                      color: getContrastColor(tempColor),
                    },
                  ]}
                >
                  Usar esta cor
                </Text>
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

  if (full.length !== 6) {
    return "#111827";
  }

  const r = parseInt(full.substring(0, 2), 16);
  const g = parseInt(full.substring(2, 4), 16);
  const b = parseInt(full.substring(4, 6), 16);

  const brightness = (r * 299 + g * 587 + b * 114) / 1000;

  return brightness > 155 ? "#111827" : "#FFFFFF";
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 13,
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
    height: 58,
    borderRadius: 14,
    backgroundColor: "#F8F9FA",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
  },

  hexColor: {
    width: 34,
    height: 34,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    marginRight: 11,
  },

  hexInfo: {
    flex: 1,
  },

  hexLabel: {
    fontSize: 10,
    color: "#9CA3AF",
    marginBottom: 2,
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
    alignItems: "center",
    justifyContent: "center",
  },

  confirmText: {
    fontSize: 13,
    fontWeight: "800",
  },
});

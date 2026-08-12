import { Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location";
import { useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import color from "@/styles/color";

type RouteSearchProps = {
  latitude?: number;
  longitude?: number;
  onRouteReady?: (data: { from: string; to: string }) => void;
};

export default function RouteSearch({
  latitude,
  longitude,
  onRouteReady,
}: RouteSearchProps) {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [loadingLocation, setLoadingLocation] = useState(false);

  const getCurrentLocation = async () => {
    try {
      setLoadingLocation(true);

      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        return;
      }

      const current = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      setFrom(
        `${current.coords.latitude.toFixed(5)}, ${current.coords.longitude.toFixed(5)}`,
      );
    } catch (error) {
      console.error("Erro ao obter localização:", error);
    } finally {
      setLoadingLocation(false);
    }
  };

  const handleContinue = () => {
    if (!to.trim()) return;

    onRouteReady?.({
      from,
      to: to.trim(),
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.fieldRow}>
          <View style={styles.iconColumn}>
            <View style={styles.currentDot} />

            <View style={styles.connector} />
          </View>

          <View style={styles.fieldContent}>
            <Text style={styles.label}>De</Text>
            <TextInput
              value={from}
              onChangeText={setFrom}
              placeholder="Onde estás ?"
              placeholderTextColor="#9CA3AF"
              style={styles.input}
              returnKeyType="search"
            />
          </View>

          <Pressable onPress={getCurrentLocation} style={styles.locationButton}>
            {loadingLocation ? (
              <ActivityIndicator size="small" color={color.root.green} />
            ) : (
              <Ionicons
                name="locate-outline"
                size={21}
                color={color.root.green}
              />
            )}
          </Pressable>
        </View>

        <View style={styles.fieldRow}>
          <View style={styles.iconColumn}>
            <View style={styles.destinationDot} />
          </View>

          <View style={styles.fieldContent}>
            <Text style={styles.label}>Para</Text>

            <TextInput
              value={to}
              onChangeText={setTo}
              placeholder="Para onde queres ir?"
              placeholderTextColor="#9CA3AF"
              style={styles.input}
              returnKeyType="search"
            />
          </View>
        </View>

        {/* CONTINUE */}
        <Pressable
          onPress={handleContinue}
          disabled={!to.trim()}
          style={({ pressed }) => [
            styles.continueButton,
            !to.trim() && styles.disabledButton,
            pressed && to.trim() && styles.pressed,
          ]}
        >
          <Text style={styles.continueText}>Continuar</Text>

          <Ionicons name="arrow-forward" size={19} color="#FFFFFF" />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},

  heading: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 16,

    borderWidth: 1,
    borderColor: "#E5E7EB",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 3,
  },

  fieldRow: {
    flexDirection: "row",
    minHeight: 62,
  },

  iconColumn: {
    width: 28,
    alignItems: "center",
  },

  currentDot: {
    width: 11,
    height: 11,
    borderRadius: 6,

    backgroundColor: color.root.green,

    marginTop: 8,
  },

  destinationDot: {
    width: 11,
    height: 11,
    borderRadius: 3,

    backgroundColor: "#111827",

    marginTop: 8,
  },

  connector: {
    width: 1,
    flex: 1,

    marginTop: 6,
    marginBottom: -2,

    borderLeftWidth: 1,
    borderLeftColor: "#D1D5DB",
    borderStyle: "dashed",
  },

  fieldContent: {
    flex: 1,
    paddingLeft: 8,
  },

  label: {
    fontSize: 12,
    color: "#9CA3AF",
    marginBottom: 3,
  },

  currentLocation: {
    fontSize: 15,
    fontWeight: "500",
    color: "#111827",
  },

  input: {
    padding: 0,

    fontSize: 15,
    fontWeight: "500",

    color: "#111827",

    minHeight: 24,
  },

  locationButton: {
    width: 38,
    height: 38,

    borderRadius: 12,

    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "#ECFDF3",
  },

  continueButton: {
    height: 52,

    marginTop: 10,

    borderRadius: 16,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",

    gap: 8,

    backgroundColor: color.root.green,
  },

  disabledButton: {
    backgroundColor: "#D1D5DB",
  },

  continueText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#FFFFFF",
  },

  pressed: {
    opacity: 0.85,
    transform: [{ scale: 0.99 }],
  },
});

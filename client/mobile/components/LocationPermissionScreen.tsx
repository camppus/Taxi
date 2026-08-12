import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import * as Location from "expo-location";

type Props = {
  onGranted?: () => void;
  onSkipped?: () => void;
};

export default function LocationPermissionScreen({
  onGranted,
  onSkipped,
}: Props) {
  const [loading, setLoading] = useState(true);
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [requesting, setRequesting] = useState(false);

  useEffect(() => {
    checkPermission();
  }, []);

  async function checkPermission() {
    try {
      const { status } = await Location.getForegroundPermissionsAsync();

      if (status === "granted") {
        setPermissionGranted(true);
        onGranted?.();
      }
    } catch (error) {
      console.error("Erro ao verificar localização:", error);
    } finally {
      setLoading(false);
    }
  }

  async function requestLocation() {
    try {
      setRequesting(true);

      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status === "granted") {
        setPermissionGranted(true);
        onGranted?.();
      }
    } catch (error) {
      console.error("Erro ao pedir localização:", error);
    } finally {
      setRequesting(false);
    }
  }

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="small" />
      </View>
    );
  }
  if (permissionGranted) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.mapPlaceholder}>
        <View style={styles.mapGrid}>
          {Array.from({ length: 10 }).map((_, index) => (
            <View
              key={`horizontal-${index}`}
              style={[
                styles.streetHorizontal,
                {
                  top: `${index * 11}%`,
                  transform: [
                    {
                      rotate: index % 2 === 0 ? "-2deg" : "2deg",
                    },
                  ],
                },
              ]}
            />
          ))}

          {Array.from({ length: 7 }).map((_, index) => (
            <View
              key={`vertical-${index}`}
              style={[
                styles.streetVertical,
                {
                  left: `${index * 16}%`,
                  transform: [
                    {
                      rotate: index % 2 === 0 ? "3deg" : "-3deg",
                    },
                  ],
                },
              ]}
            />
          ))}
        </View>

        {/* áreas verdes */}
        <View style={[styles.park, styles.park1]} />
        <View style={[styles.park, styles.park2]} />
        <View style={[styles.park, styles.park3]} />
      </View>

      <View style={styles.overlay} />
      <View style={styles.card}>
        {/* ÍCONE */}
        <View style={styles.locationIconContainer}>
          <View style={styles.outerCircle}>
            <View style={styles.middleCircle}>
              <View style={styles.innerCircle}>
                <View style={styles.pin}>
                  <View style={styles.pinDot} />
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* TÍTULO */}
        <Text style={styles.title}>Permitir capturar{"\n"}localização</Text>

        {/* DESCRIÇÃO */}
        <Text style={styles.description}>
          Permita que o app saiba exatamente{"\n"}
          onde estás localizado
        </Text>

        {/* BOTÃO */}
        <Pressable
          style={({ pressed }) => [
            styles.button,
            pressed && styles.buttonPressed,
          ]}
          onPress={requestLocation}
          disabled={requesting}
        >
          {requesting ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Permitir Acesso</Text>
          )}
        </Pressable>

        {/* PULAR */}
        <Pressable
          style={styles.skipButton}
          onPress={onSkipped}
          disabled={requesting}
        >
          <Text style={styles.skipText}>Pular</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },

  mapPlaceholder: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#e4e9e9",
    overflow: "hidden",
  },

  mapGrid: {
    ...StyleSheet.absoluteFillObject,
  },

  streetHorizontal: {
    position: "absolute",
    left: -100,
    width: "130%",
    height: 5,
    backgroundColor: "#f8f8f5",
  },

  streetVertical: {
    position: "absolute",
    top: -100,
    height: "130%",
    width: 5,
    backgroundColor: "#f8f8f5",
  },

  park: {
    position: "absolute",
    backgroundColor: "#b9dfb5",
    opacity: 0.8,
  },

  park1: {
    width: 180,
    height: 300,
    right: -50,
    bottom: 30,
    borderRadius: 100,
    transform: [{ rotate: "-20deg" }],
  },

  park2: {
    width: 120,
    height: 200,
    left: -50,
    top: 80,
    borderRadius: 80,
    transform: [{ rotate: "25deg" }],
  },

  park3: {
    width: 100,
    height: 140,
    right: 30,
    top: 100,
    borderRadius: 70,
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(235, 239, 239, 0.58)",
  },

  card: {
    position: "absolute",
    left: 20,
    right: 20,
    top: "50%",
    transform: [{ translateY: -190 }],
    backgroundColor: "#fff",
    borderRadius: 28,
    paddingHorizontal: 24,
    paddingTop: 38,
    paddingBottom: 28,
    alignItems: "center",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.12,
    shadowRadius: 20,
    elevation: 8,
  },

  locationIconContainer: {
    marginBottom: 30,
  },

  outerCircle: {
    width: 108,
    height: 108,
    borderRadius: 54,
    backgroundColor: "rgba(58, 210, 103, 0.12)",
    justifyContent: "center",
    alignItems: "center",
  },

  middleCircle: {
    width: 82,
    height: 82,
    borderRadius: 41,
    backgroundColor: "rgba(58, 210, 103, 0.22)",
    justifyContent: "center",
    alignItems: "center",
  },

  innerCircle: {
    width: 62,
    height: 62,
    borderRadius: 31,
    backgroundColor: "#35d06b",
    justifyContent: "center",
    alignItems: "center",
  },

  pin: {
    width: 22,
    height: 28,
    backgroundColor: "#101b2a",
    borderRadius: 14,
    transform: [{ rotate: "45deg" }],
    justifyContent: "center",
    alignItems: "center",
  },

  pinDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#35d06b",
  },

  title: {
    fontSize: 27,
    lineHeight: 35,
    fontWeight: "700",
    color: "#101827",
    textAlign: "center",
    letterSpacing: -0.5,
  },

  description: {
    marginTop: 18,
    fontSize: 16,
    lineHeight: 24,
    color: "#96999e",
    textAlign: "center",
  },

  button: {
    width: "100%",
    height: 58,
    marginTop: 30,
    borderRadius: 10,
    backgroundColor: "#101827",
    justifyContent: "center",
    alignItems: "center",
  },

  buttonPressed: {
    opacity: 0.8,
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

  skipButton: {
    marginTop: 25,
    paddingVertical: 5,
  },

  skipText: {
    color: "#a0a2a6",
    fontSize: 16,
    fontWeight: "500",
  },
});

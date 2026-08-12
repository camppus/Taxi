import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  StatusBar,
  Platform,
} from "react-native";
import { AppleMaps, GoogleMaps } from "expo-maps";

import { Ionicons } from "@expo/vector-icons";
import colors from "@/styles/color";

export default function Home() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const [fromLocation, setFromLocation] = useState({
    latitude: -8.839,
    longitude: 13.289,
  });

  const [toLocation, setToLocation] = useState({
    latitude: -8.815,
    longitude: 13.235,
  });

  const handleSearch = () => {
    if (!from || !to) return;

    console.log({ from, to });
    // router.push(...)
  };

  const swapLocations = () => {
    const currentFrom = from;
    const currentFromLocation = fromLocation;

    setFrom(to);
    setTo(currentFrom);

    setFromLocation(toLocation);
    setToLocation(currentFromLocation);
  };

  const markers = [
    {
      coordinates: fromLocation,
      title: "Origem",
      snippet: from || "Local de partida",
    },
    {
      coordinates: toLocation,
      title: "Destino",
      snippet: to || "Destino",
    },
  ];

  const cameraPosition = {
    coordinates: {
      latitude: -8.839,
      longitude: 13.289,
    },
    zoom: 12,
  };

  const renderMap = () => {
    if (Platform.OS === "ios") {
      return (
        <AppleMaps.View
          style={StyleSheet.absoluteFillObject}
          cameraPosition={cameraPosition}
          markers={markers}
        />
      );
    }

    if (Platform.OS === "android") {
      return (
        <GoogleMaps.View
          style={StyleSheet.absoluteFillObject}
          cameraPosition={cameraPosition}
          markers={markers}
        />
      );
    }

    return (
      <View style={styles.mapFallback}>
        <Text>Mapa disponível apenas em Android e iOS</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={colors.root.secondary}
      />

      {/* MAPA */}
      <View style={styles.mapContainer}>
        {renderMap()}

        {/* BOTÃO VOLTAR */}
        <TouchableOpacity style={styles.backButton}>
          <Ionicons name="arrow-back" size={22} color={colors.root.secondary} />
        </TouchableOpacity>

        {/* LOCALIZAÇÃO ATUAL */}
        <TouchableOpacity style={styles.locationButton}>
          <Ionicons name="locate" size={21} color={colors.root.secondary} />
        </TouchableOpacity>
      </View>

      {/* BOTTOM SHEET */}
      <View style={styles.bottomSheet}>
        <View style={styles.handle} />

        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Encontrar uma viagem</Text>
            <Text style={styles.subtitle}>Para onde você quer ir?</Text>
          </View>

          <View style={styles.searchIcon}>
            <Ionicons name="search" size={20} color={colors.root.green} />
          </View>
        </View>

        {/* LOCATION INPUTS */}
        <View style={styles.locationSection}>
          {/* FROM */}
          <View style={styles.inputRow}>
            <View style={styles.iconColumn}>
              <View style={styles.fromDot} />
              <View style={styles.verticalLine} />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>DE</Text>
              <TextInput
                value={from}
                onChangeText={setFrom}
                placeholder="Local de partida"
                placeholderTextColor="#A0A0A0"
                style={styles.input}
              />
            </View>
          </View>

          {/* TO */}
          <View style={styles.inputRow}>
            <View style={styles.iconColumn}>
              <View style={styles.toDot}>
                <View style={styles.toDotInner} />
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>PARA</Text>
              <TextInput
                value={to}
                onChangeText={setTo}
                placeholder="Destino"
                placeholderTextColor="#A0A0A0"
                style={styles.input}
              />
            </View>
          </View>

          {/* SWAP */}
          <TouchableOpacity
            style={styles.swapButton}
            onPress={swapLocations}
            activeOpacity={0.8}
          >
            <Ionicons
              name="swap-vertical"
              size={19}
              color={colors.root.secondary}
            />
          </TouchableOpacity>
        </View>

        {/* RECENT LOCATIONS */}
        <View style={styles.recentHeader}>
          <Text style={styles.recentTitle}>Locais recentes</Text>
          <TouchableOpacity>
            <Text style={styles.clearText}>Limpar</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.recentItem}>
          <View style={styles.recentIcon}>
            <Ionicons
              name="time-outline"
              size={19}
              color={colors.root.textTint}
            />
          </View>
          <View style={styles.recentInfo}>
            <Text style={styles.recentName}>Talatona</Text>
            <Text style={styles.recentAddress}>Luanda, Angola</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color="#B0B0B0" />
        </View>

        <View style={styles.recentItem}>
          <View style={styles.recentIcon}>
            <Ionicons
              name="time-outline"
              size={19}
              color={colors.root.textTint}
            />
          </View>
          <View style={styles.recentInfo}>
            <Text style={styles.recentName}>Kilamba</Text>
            <Text style={styles.recentAddress}>Luanda, Angola</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color="#B0B0B0" />
        </View>

        {/* SEARCH BUTTON */}
        <TouchableOpacity
          style={[
            styles.searchButton,
            (!from || !to) && styles.searchButtonDisabled,
          ]}
          disabled={!from || !to}
          onPress={handleSearch}
          activeOpacity={0.85}
        >
          <Text style={styles.searchButtonText}>Buscar viagens</Text>
          <View style={styles.searchButtonIcon}>
            <Ionicons
              name="arrow-forward"
              size={19}
              color={colors.root.secondary}
            />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.root.primary },
  mapContainer: { flex: 1, minHeight: 390 },
  mapFallback: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  bottomSheet: {
    backgroundColor: colors.root.primary,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -28,
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 22,
    elevation: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.12,
    shadowRadius: 15,
  },
  handle: {
    width: 42,
    height: 4,
    borderRadius: 10,
    backgroundColor: "#D8D8D8",
    alignSelf: "center",
    marginBottom: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  title: { fontSize: 22, fontWeight: "800", color: colors.root.secondary },
  subtitle: { fontSize: 14, color: colors.root.textTint, marginTop: 4 },
  searchIcon: {
    width: 43,
    height: 43,
    borderRadius: 14,
    backgroundColor: "#EAF9F0",
    alignItems: "center",
    justifyContent: "center",
  },
  backButton: {
    position: "absolute",
    top: 55,
    left: 20,
    width: 46,
    height: 46,
    borderRadius: 15,
    backgroundColor: colors.root.primary,
    alignItems: "center",
    justifyContent: "center",
    elevation: 7,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  locationButton: {
    position: "absolute",
    right: 20,
    bottom: 50,
    width: 46,
    height: 46,
    borderRadius: 15,
    backgroundColor: colors.root.primary,
    alignItems: "center",
    justifyContent: "center",
    elevation: 7,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  locationSection: {
    position: "relative",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 18,
    paddingVertical: 5,
    backgroundColor: "#FAFAFA",
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    minHeight: 68,
    paddingHorizontal: 15,
  },
  iconColumn: {
    width: 25,
    alignItems: "center",
    alignSelf: "stretch",
    justifyContent: "center",
  },
  fromDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.root.secondary,
    borderWidth: 3,
    borderColor: "#D9DEE5",
  },
  toDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: colors.root.green,
    alignItems: "center",
    justifyContent: "center",
  },
  toDotInner: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: colors.root.primary,
  },
  verticalLine: {
    width: 1,
    height: 28,
    backgroundColor: "#D4D4D4",
    marginVertical: 2,
  },
  inputContainer: { flex: 1, marginLeft: 12 },
  label: {
    fontSize: 10,
    fontWeight: "800",
    color: colors.root.textTint,
    letterSpacing: 0.8,
    marginBottom: 2,
  },
  input: {
    fontSize: 16,
    color: colors.root.secondary,
    fontWeight: "600",
    paddingVertical: 4,
  },
  swapButton: {
    position: "absolute",
    right: 15,
    top: "50%",
    marginTop: -19,
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: colors.root.primary,
    borderWidth: 1,
    borderColor: "#E6E6E6",
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
  },
  recentHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 8,
  },
  recentTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.root.secondary,
  },
  clearText: { fontSize: 13, color: colors.root.green, fontWeight: "700" },
  recentItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 9,
  },
  recentIcon: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: "#F3F4F5",
    alignItems: "center",
    justifyContent: "center",
  },
  recentInfo: { flex: 1, marginLeft: 12 },
  recentName: { fontSize: 14, fontWeight: "700", color: colors.root.secondary },
  recentAddress: { fontSize: 12, color: colors.root.textTint, marginTop: 2 },
  searchButton: {
    height: 57,
    borderRadius: 17,
    backgroundColor: colors.root.green,
    marginTop: 15,
    paddingLeft: 20,
    paddingRight: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  searchButtonDisabled: { backgroundColor: "#C9EAD7" },
  searchButtonText: {
    color: colors.root.secondary,
    fontSize: 16,
    fontWeight: "800",
  },
  searchButtonIcon: {
    width: 43,
    height: 43,
    borderRadius: 13,
    backgroundColor: colors.root.primary,
    alignItems: "center",
    justifyContent: "center",
  },
});

import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import MapView, { Marker, UrlTile, Region, Polyline } from "react-native-maps";
import { Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location";
import colors from "@/styles/color";

const initialRegion: Region = {
  latitude: -8.839,
  longitude: 13.289,
  latitudeDelta: 0.08,
  longitudeDelta: 0.08,
};

type LatLng = { latitude: number; longitude: number };

const GEOCODE_DEBOUNCE_MS = 700;

export default function Home() {
  const mapRef = useRef<MapView>(null);
  const [currentLocation, setCurrentLocation] = useState<LatLng | null>(null);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [fromLocation, setFromLocation] = useState<LatLng | null>(null);
  const [toLocation, setToLocation] = useState<LatLng | null>(null);
  const [routeCoords, setRouteCoords] = useState<LatLng[]>([]);
  const [isRouting, setIsRouting] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);

  const skipFromGeocode = useRef(false);
  const skipToGeocode = useRef(false);

  const lastGeocodedFrom = useRef<{ text: string; coords: LatLng } | null>(
    null,
  );
  const lastGeocodedTo = useRef<{ text: string; coords: LatLng } | null>(null);

  const geocodePlace = async (query: string): Promise<LatLng | null> => {
    try {
      const search = query.toLowerCase().includes("angola")
        ? query
        : `${query}, Luanda, Angola`;

      const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
        search,
      )}&limit=1`;

      const response = await fetch(url, {
        headers: { "Accept-Language": "pt" },
      });
      const data = await response.json();

      if (data && data.length > 0) {
        return {
          latitude: parseFloat(data[0].lat),
          longitude: parseFloat(data[0].lon),
        };
      }
      return null;
    } catch (error) {
      console.log("Erro no geocode:", error);
      return null;
    }
  };

  const reverseGeocode = async (coords: LatLng): Promise<string | null> => {
    try {
      const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${coords.latitude}&lon=${coords.longitude}&zoom=16&addressdetails=1`;

      const response = await fetch(url, {
        headers: { "Accept-Language": "pt" },
      });
      const data = await response.json();

      const address = data?.address;
      return (
        address?.suburb ||
        address?.neighbourhood ||
        address?.city_district ||
        address?.town ||
        address?.city ||
        address?.road ||
        data?.display_name ||
        null
      );
    } catch (error) {
      console.log("Erro no reverse geocode:", error);
      return null;
    }
  };

  const handleUseCurrentLocation = async () => {
    try {
      setIsLocating(true);

      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permissão de localização negada");
        return;
      }

      const position = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      const coords: LatLng = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      };

      setFromLocation(coords);

      const placeName = await reverseGeocode(coords);
      const resolvedName = placeName ?? "Localização atual";

      skipFromGeocode.current = true;
      setFrom(resolvedName);
      lastGeocodedFrom.current = { text: resolvedName, coords };

      mapRef.current?.animateToRegion(
        { ...coords, latitudeDelta: 0.05, longitudeDelta: 0.05 },
        500,
      );
      setCurrentLocation(coords);
    } catch (error) {
      console.log("Erro ao obter localização:", error);
    } finally {
      setIsLocating(false);
    }
  };

  const getRoute = async (
    origin: LatLng,
    destination: LatLng,
  ): Promise<LatLng[]> => {
    const url =
      `https://router.project-osrm.org/route/v1/driving/` +
      `${origin.longitude},${origin.latitude};` +
      `${destination.longitude},${destination.latitude}` +
      `?overview=full&geometries=geojson`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`OSRM HTTP ${response.status}`);
    }

    const data = await response.json();

    if (data.code !== "Ok") {
      throw new Error(data.message || "Rota não encontrada");
    }

    const coordinates = data.routes?.[0]?.geometry?.coordinates;

    if (!coordinates?.length) {
      return [];
    }

    return coordinates.map(([longitude, latitude]: [number, number]) => ({
      latitude,
      longitude,
    }));
  };

  const isSameLocation = (a: LatLng | null, b: LatLng | null) => {
    if (!a || !b) return false;

    const tolerance = 0.0005;

    return (
      Math.abs(a.latitude - b.latitude) < tolerance &&
      Math.abs(a.longitude - b.longitude) < tolerance
    );
  };

  const handleSearch = async () => {
    setSearchError(null);
    setIsRouting(true);

    try {
      console.log("🔎 Procurando:", from, "→", to);

      const originCoords =
        lastGeocodedFrom.current?.text === from
          ? lastGeocodedFrom.current.coords
          : await geocodePlace(from);

      const destinationCoords =
        lastGeocodedTo.current?.text === to
          ? lastGeocodedTo.current.coords
          : await geocodePlace(to);

      if (!originCoords) {
        setSearchError(`Não encontrei "${from}".`);
        return;
      }

      if (!destinationCoords) {
        setSearchError(`Não encontrei "${to}".`);
        return;
      }

      lastGeocodedFrom.current = {
        text: from,
        coords: originCoords,
      };

      lastGeocodedTo.current = {
        text: to,
        coords: destinationCoords,
      };

      setFromLocation(originCoords);
      setToLocation(destinationCoords);

      const route = await getRoute(originCoords, destinationCoords);

      if (!route.length) {
        setSearchError("Não foi possível encontrar uma rota.");
        return;
      }
      setRouteCoords(route);
      console.log("✅ Rota desenhada:", route.length);
    } catch (error) {
      console.error("❌ Erro:", error);
      setSearchError("Não foi possível calcular a rota.");
    } finally {
      setIsRouting(false);
    }
  };

  const swapLocations = () => {
    const currentFrom = from;
    const currentFromLocation = fromLocation;
    const currentFromCache = lastGeocodedFrom.current;

    skipFromGeocode.current = true;
    skipToGeocode.current = true;

    setFrom(to);
    setTo(currentFrom);

    setFromLocation(toLocation);
    setToLocation(currentFromLocation);

    lastGeocodedFrom.current = lastGeocodedTo.current;
    lastGeocodedTo.current = currentFromCache;

    setRouteCoords([]);
  };

  const canSearch = Boolean(from && to);

  useEffect(() => {
    if (routeCoords.length < 2) return;

    const timer = setTimeout(() => {
      mapRef.current?.fitToCoordinates(routeCoords, {
        edgePadding: { top: 80, right: 60, bottom: 260, left: 60 },
        animated: true,
      });
    }, 100);
    return () => clearTimeout(timer);
  }, [routeCoords]);

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
      <View style={styles.mapContainer}>
        <MapView
          ref={mapRef}
          style={StyleSheet.absoluteFillObject}
          initialRegion={initialRegion}
          showsUserLocation
          showsMyLocationButton={false}
          showsCompass={false}
          toolbarEnabled={false}
        >
          <UrlTile
            urlTemplate="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
            maximumZ={19}
            flipY={false}
          />

          {routeCoords.length > 0 && (
            <Polyline
              coordinates={routeCoords}
              strokeColor={colors.root.green}
              strokeWidth={4}
              key={`route1-${routeCoords.length}-${routeCoords[0]?.latitude}`}
            />
          )}

          {fromLocation && !isSameLocation(fromLocation, currentLocation) && (
            <Marker
              key={`fromLocation-${fromLocation.latitude}-${fromLocation.longitude}`}
              coordinate={fromLocation}
              anchor={{ x: 0.5, y: 1 }}
            >
              <View style={styles.originMarker}>
                <View style={styles.originDot} />
              </View>
            </Marker>
          )}

          {routeCoords.length > 2 && (
            <Polyline
              key={`route-${routeCoords.length}-${routeCoords[0]?.latitude}`}
              coordinates={routeCoords}
              strokeColor={colors.root.green}
              strokeWidth={5}
              lineCap="round"
              lineJoin="round"
            />
          )}
          {toLocation && (
            <Marker
              key={`destination-${toLocation.latitude}-${toLocation.longitude}`}
              coordinate={toLocation}
              anchor={{ x: 0.5, y: 1 }}
            >
              <View style={styles.pinWrapper}>
                <Ionicons name="location" size={38} color={colors.root.green} />
                <View style={styles.pinDot} />
              </View>
            </Marker>
          )}
        </MapView>
        <TouchableOpacity
          style={styles.locationButton}
          onPress={handleUseCurrentLocation}
          disabled={isLocating}
        >
          {isLocating ? (
            <ActivityIndicator color={colors.root.secondary} size="small" />
          ) : (
            <Ionicons name="locate" size={21} color={colors.root.secondary} />
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.bottomSheet}>
        <View style={styles.handle} />

        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Encontrar uma viagem</Text>
            <Text style={styles.subtitle}>Para onde você quer ir?</Text>
          </View>
        </View>

        <View style={styles.locationSection}>
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

          <TouchableOpacity
            style={styles.swapButton}
            onPress={swapLocations}
            activeOpacity={0.8}
          >
            <Ionicons
              name="swap-vertical"
              size={19}
              color={colors.root.green}
            />
          </TouchableOpacity>
        </View>

        {searchError && <Text style={styles.errorText}>{searchError}</Text>}

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

        <TouchableOpacity
          style={[
            styles.searchButton,
            !canSearch && styles.searchButtonDisabled,
          ]}
          disabled={!canSearch || isRouting}
          onPress={async () => {
            await handleSearch();
            await handleSearch();
          }}
          activeOpacity={0.85}
        >
          {isRouting ? (
            <ActivityIndicator color={colors.root.secondary} />
          ) : (
            <Text style={styles.searchButtonText}>Buscar viagens</Text>
          )}
          <View style={styles.searchButtonIcon}>
            <Ionicons
              name="arrow-forward"
              size={19}
              color={colors.root.secondary}
            />
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  originMarker: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.root.primary,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: colors.root.secondary,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },

  originDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.root.secondary,
  },

  container: { flex: 1, backgroundColor: colors.root.primary },
  mapContainer: { flex: 1, minHeight: 390 },
  bottomSheet: {
    backgroundColor: colors.root.primary,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -28,
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 152,
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
  pinWrapper: {
    alignItems: "center",
    justifyContent: "flex-end",
  },
  pinDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "rgba(0,0,0,0.25)",
    marginTop: -3,
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
    borderWidth: 1,
    borderColor: "#DDF7E7",
    elevation: 3,
    width: 43,
    height: 43,
    borderRadius: 14,
    backgroundColor: "#EAF9F0",
    alignItems: "center",
    justifyContent: "center",
  },
  errorText: {
    color: "#D14343",
    fontSize: 12,
    marginTop: 8,
    marginLeft: 4,
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

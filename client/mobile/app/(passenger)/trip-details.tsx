import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  Pressable,
} from "react-native";

import MapView, { Marker, Polyline } from "react-native-maps";

import colors from "@/styles/color";
import { Trips } from "@/types/Trips";
import { mockTrips } from "@/mocks/trip";
import { TripCard } from "@/components/TripCard";

type LatLng = {
  latitude: number;
  longitude: number;
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
    throw new Error("Erro ao obter rota");
  }

  const data = await response.json();

  if (data.code !== "Ok") {
    throw new Error("Rota não encontrada");
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

export default function TripDetails() {
  const router = useRouter();
  const mapRef = useRef<MapView>(null);
  const [showMap, setShowMap] = useState(false);
  const { from, to, date, seats } = useLocalSearchParams<{
    from?: string;
    to?: string;
    date?: string;
    seats?: string;
  }>();

  const parsedSeats = seats ? Number(seats) : 1;

  const [fromCoords, setFromCoords] = useState<LatLng | null>(null);
  const [toCoords, setToCoords] = useState<LatLng | null>(null);
  const [routeCoords, setRouteCoords] = useState<LatLng[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [trips] = useState<Trips[]>(mockTrips);

  const geocodePlace = async (place: string): Promise<LatLng | null> => {
    try {
      const search = place.toLowerCase().includes("angola")
        ? place
        : `${place}, Luanda, Angola`;

      const url =
        `https://nominatim.openstreetmap.org/search` +
        `?format=json` +
        `&q=${encodeURIComponent(search)}` +
        `&limit=1`;

      const response = await fetch(url, {
        headers: {
          "Accept-Language": "pt",
        },
      });

      if (!response.ok) {
        throw new Error("Erro ao pesquisar localização");
      }

      const data = await response.json();

      if (!data?.length) return null;

      return {
        latitude: parseFloat(data[0].lat),
        longitude: parseFloat(data[0].lon),
      };
    } catch (error) {
      console.error("Geocode error:", error);
      return null;
    }
  };

  useEffect(() => {
    const loadLocations = async () => {
      if (!from || !to) {
        setError("Local de partida ou destino não informado.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const [origin, destination] = await Promise.all([
          geocodePlace(from),
          geocodePlace(to),
        ]);

        if (!origin) {
          setError(`Não encontrei o local de partida: ${from}`);
          return;
        }

        if (!destination) {
          setError(`Não encontrei o destino: ${to}`);
          return;
        }

        setFromCoords(origin);
        setToCoords(destination);

        const route = await getRoute(origin, destination);

        if (!route.length) {
          setError("Não foi possível calcular a rota.");
          return;
        }

        setRouteCoords(route);

        setTimeout(() => {
          mapRef.current?.fitToCoordinates(route, {
            edgePadding: {
              top: 90,
              right: 50,
              bottom: 80,
              left: 50,
            },
            animated: true,
          });
        }, 300);
      } catch (error) {
        console.error(error);
        setError("Não foi possível carregar a viagem.");
      } finally {
        setLoading(false);
      }
    };

    loadLocations();
  }, [from, to]);

  const formatDate = () => {
    if (!date) return "Hoje";

    const parsed = new Date(date);

    if (Number.isNaN(parsed.getTime())) {
      return date;
    }

    return parsed.toLocaleDateString("pt-AO", {
      day: "2-digit",
      month: "short",
    });
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.root.green} />
        <Text style={styles.loadingText}>A preparar a sua viagem...</Text>
      </View>
    );
  }

  if (error || !fromCoords || !toCoords || routeCoords.length === 0) {
    return (
      <View style={styles.center}>
        <Ionicons name="location-outline" size={42} color="#B0B0B0" />

        <Text style={styles.errorTitle}>Viagem não encontrada</Text>

        <Text style={styles.errorText}>{error}</Text>

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backButtonText}>Voltar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.tripHeader}>
          <View style={styles.tripHeaderTop}>
            <View style={styles.routeInfo}>
              <Text style={styles.routeTitle} numberOfLines={1}>
                {from}
              </Text>

              <Ionicons
                name="arrow-forward"
                size={17}
                color={colors.root.green}
              />

              <Text style={styles.routeTitle} numberOfLines={1}>
                {to}
              </Text>
            </View>
          </View>

          <View style={styles.searchMeta}>
            <View style={styles.metaItem}>
              <Ionicons
                name="calendar-outline"
                size={16}
                color={colors.root.textTint}
              />

              <Text style={styles.metaText}>{formatDate()}</Text>
            </View>

            <View style={styles.metaDivider} />

            <View style={styles.metaItem}>
              <Ionicons
                name="people-outline"
                size={16}
                color={colors.root.textTint}
              />

              <Text style={styles.metaText}>
                {parsedSeats} {parsedSeats === 1 ? "lugar" : "lugares"}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.resultsHeader}>
          <View>
            <Text style={styles.resultsTitle}>Viagens disponíveis</Text>

            <Text style={styles.resultsSubtitle}>
              Encontrámos {trips.length} viagens
            </Text>
          </View>

          <View
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 5,
            }}
          >
            <TouchableOpacity
              style={styles.mapButton}
              onPress={() => setShowMap(true)}
              activeOpacity={0.8}
            >
              <Ionicons
                name="map-outline"
                size={19}
                color={colors.root.primary}
              />
            </TouchableOpacity>
          </View>
        </View>

        <FlatList
          data={trips}
          keyExtractor={(item, index) =>
            `${item.name}-${item.driver.phone}-${index}`
          }
          style={{ marginBottom: 100, flex: 1 }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <TripCard
              trip={item}
              requestedSeats={parsedSeats}
              onPress={() => {
                console.log("Trip selecionada:", item);
              }}
            />
          )}
          ListEmptyComponent={
            <View style={styles.emptyTrips}>
              <Ionicons name="car-outline" size={38} color="#B8B8B8" />

              <Text style={styles.emptyTitle}>Nenhuma viagem encontrada</Text>

              <Text style={styles.emptyText}>
                Tente alterar a data ou o número de lugares.
              </Text>
            </View>
          }
        />
      </View>

      <Modal
        visible={showMap}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setShowMap(false)}
      >
        <View style={styles.mapModal}>
          <MapView
            ref={mapRef}
            style={StyleSheet.absoluteFillObject}
            showsCompass={false}
            toolbarEnabled={false}
            initialRegion={{
              latitude: fromCoords.latitude,
              longitude: fromCoords.longitude,
              latitudeDelta: 0.05,
              longitudeDelta: 0.05,
            }}
          >
            {/* ROTA */}
            <Polyline
              coordinates={routeCoords}
              strokeColor={colors.root.green}
              strokeWidth={5}
              lineCap="round"
              lineJoin="round"
            />

            {/* PARTIDA */}
            <Marker
              coordinate={fromCoords}
              title="Partida"
              description={from}
              anchor={{ x: 0.5, y: 0.5 }}
            >
              <View style={styles.userMarker}>
                <Ionicons
                  name="person"
                  size={18}
                  color={colors.root.secondary}
                />
              </View>
            </Marker>

            {/* DESTINO */}
            <Marker
              coordinate={toCoords}
              title="Destino"
              description={to}
              anchor={{ x: 0.5, y: 1 }}
            >
              <View style={styles.destinationPin}>
                <Ionicons name="location" size={42} color={colors.root.green} />
              </View>
            </Marker>
          </MapView>

          {/* HEADER DO MAPA */}
          <View style={styles.mapModalHeader}>
            <TouchableOpacity
              style={styles.mapCloseButton}
              onPress={() => setShowMap(false)}
              activeOpacity={0.8}
            >
              <Ionicons
                name="arrow-back"
                size={21}
                color={colors.root.secondary}
              />
            </TouchableOpacity>

            <View style={styles.mapTitleBox}>
              <Text style={styles.mapModalTitle}>Rota da viagem</Text>

              <Text style={styles.mapModalSubtitle} numberOfLines={1}>
                {from} → {to}
              </Text>
            </View>
          </View>

          <View style={styles.mapBottomCard}>
            <View style={styles.mapLocationRow}>
              <View style={styles.smallUserMarker}>
                <Ionicons
                  name="person"
                  size={13}
                  color={colors.root.secondary}
                />
              </View>

              <View style={styles.mapLocationInfo}>
                <Text style={styles.mapLocationLabel}>PARTIDA</Text>
                <Text style={styles.mapLocationText} numberOfLines={1}>
                  {from}
                </Text>
              </View>
            </View>

            <View style={styles.mapLocationLine} />

            <View style={styles.mapLocationRow}>
              <View style={styles.smallDestinationMarker}>
                <Ionicons name="location" size={18} color={colors.root.green} />
              </View>

              <View style={styles.mapLocationInfo}>
                <Text style={styles.mapLocationLabel}>DESTINO</Text>
                <Text style={styles.mapLocationText} numberOfLines={1}>
                  {to}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 31,
  },

  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
    backgroundColor: colors.root.primary,
  },

  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: colors.root.textTint,
  },

  errorTitle: {
    marginTop: 12,
    fontSize: 18,
    fontWeight: "800",
    color: colors.root.secondary,
  },

  errorText: {
    marginTop: 6,
    textAlign: "center",
    fontSize: 13,
    color: colors.root.textTint,
  },

  backButton: {
    marginTop: 20,
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 14,
    backgroundColor: colors.root.green,
  },

  backButtonText: {
    fontWeight: "800",
    color: colors.root.secondary,
  },

  mapContainer: {
    height: 300,
    position: "relative",
  },

  backIcon: {
    position: "absolute",
    top: 55,
    left: 20,
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: colors.root.primary,
    alignItems: "center",
    justifyContent: "center",
    elevation: 6,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },

  content: {
    flex: 1,
    marginTop: -20,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    backgroundColor: colors.root.primary,
    overflow: "hidden",
  },

  tripHeader: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },

  tripHeaderTop: {
    flexDirection: "row",
    alignItems: "center",
  },

  routeInfo: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  routeTitle: {
    flexShrink: 1,
    fontSize: 15,
    fontWeight: "800",
    color: colors.root.secondary,
  },

  searchMeta: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 13,
    gap: 12,
  },

  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },

  metaText: {
    fontSize: 12,
    color: colors.root.textTint,
    fontWeight: "600",
  },

  metaDivider: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#C8C8C8",
  },

  resultsHeader: {
    paddingHorizontal: 20,
    paddingTop: 17,
    paddingBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  resultsTitle: {
    fontSize: 17,
    fontWeight: "800",
    color: colors.root.secondary,
  },

  resultsSubtitle: {
    marginTop: 3,
    fontSize: 12,
    color: colors.root.textTint,
  },

  filterButton: {
    width: 40,
    height: 40,
    borderRadius: 13,
    backgroundColor: "#F4F5F5",
    alignItems: "center",
    justifyContent: "center",
  },

  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 35,
    gap: 10,
  },

  tripCard: {
    flexDirection: "row",
    backgroundColor: colors.root.primary,
    borderWidth: 1,
    borderColor: "#E9E9E9",
    borderRadius: 19,
    padding: 14,
    minHeight: 145,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 7,
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },

  timeColumn: {
    width: 53,
    alignItems: "flex-start",
    paddingTop: 2,
  },

  departureTime: {
    fontSize: 17,
    fontWeight: "900",
    color: colors.root.secondary,
  },

  departureLabel: {
    fontSize: 10,
    color: colors.root.textTint,
    marginTop: 2,
  },

  cardDivider: {
    width: 1,
    backgroundColor: "#EEEEEE",
    marginHorizontal: 12,
  },

  tripInfo: {
    flex: 1,
  },

  driverRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  driverAvatar: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: "#F1F2F2",
    alignItems: "center",
    justifyContent: "center",
  },

  driverInfo: {
    marginLeft: 9,
    flex: 1,
  },

  driverName: {
    fontSize: 13,
    fontWeight: "800",
    color: colors.root.secondary,
  },

  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 3,
    gap: 3,
  },

  rating: {
    fontSize: 11,
    fontWeight: "700",
    color: colors.root.secondary,
  },

  driverTrips: {
    fontSize: 10,
    color: colors.root.textTint,
  },

  vehicleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
    gap: 6,
  },

  vehicleName: {
    flex: 1,
    fontSize: 12,
    fontWeight: "700",
    color: colors.root.secondary,
  },

  seatsBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    backgroundColor: "#EAF9F0",
    paddingHorizontal: 6,
    paddingVertical: 4,
    borderRadius: 7,
  },

  seatsBadgeWarning: {
    backgroundColor: "#FFF0F0",
  },

  seatsText: {
    fontSize: 9,
    fontWeight: "800",
    color: colors.root.green,
  },

  seatsTextWarning: {
    color: "#D14343",
  },

  vehicleColor: {
    fontSize: 10,
    color: colors.root.textTint,
    marginTop: 5,
  },

  priceColumn: {
    width: 62,
    alignItems: "flex-end",
    justifyContent: "flex-start",
  },

  price: {
    fontSize: 15,
    fontWeight: "900",
    color: colors.root.secondary,
  },

  currency: {
    fontSize: 10,
    color: colors.root.textTint,
    marginTop: 1,
  },

  cardArrow: {
    marginTop: "auto",
  },

  originMarker: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.root.primary,
    borderWidth: 2,
    borderColor: colors.root.secondary,
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
  },

  originDot: {
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: colors.root.secondary,
  },

  destinationMarker: {
    alignItems: "center",
    justifyContent: "center",
  },

  emptyTrips: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 45,
    paddingHorizontal: 30,
  },

  emptyTitle: {
    marginTop: 10,
    fontSize: 15,
    fontWeight: "800",
    color: colors.root.secondary,
  },

  emptyText: {
    marginTop: 5,
    fontSize: 12,
    textAlign: "center",
    color: colors.root.textTint,
  },

  mapButton: {
    height: 40,
    paddingHorizontal: 12,
    borderRadius: 13,
    backgroundColor: colors.root.green,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  mapButtonText: {
    fontSize: 12,
    fontWeight: "800",
    color: colors.root.secondary,
  },

  mapModal: {
    flex: 1,
    backgroundColor: colors.root.primary,
  },

  mapModalHeader: {
    position: "absolute",
    top: 55,
    left: 18,
    right: 18,
    flexDirection: "row",
    alignItems: "center",
  },

  mapCloseButton: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: colors.root.primary,
    alignItems: "center",
    justifyContent: "center",
    elevation: 7,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },

  mapTitleBox: {
    marginLeft: 10,
    backgroundColor: colors.root.primary,
    borderRadius: 14,
    paddingHorizontal: 13,
    paddingVertical: 8,
    flex: 1,
    elevation: 5,
  },

  mapModalTitle: {
    fontSize: 14,
    fontWeight: "800",
    color: colors.root.secondary,
  },

  mapModalSubtitle: {
    fontSize: 11,
    color: colors.root.textTint,
    marginTop: 2,
  },

  userMarker: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: colors.root.primary,
    borderWidth: 3,
    borderColor: colors.root.secondary,
    alignItems: "center",
    justifyContent: "center",
    elevation: 7,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },

  destinationPin: {
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
  },

  mapBottomCard: {
    position: "absolute",
    left: 16,
    right: 16,
    bottom: 25,
    backgroundColor: colors.root.primary,
    borderRadius: 22,
    padding: 18,
    elevation: 10,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 4,
    },
  },

  mapLocationRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  mapLocationInfo: {
    flex: 1,
    marginLeft: 11,
  },

  mapLocationLabel: {
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 0.8,
    color: colors.root.textTint,
  },

  mapLocationText: {
    fontSize: 13,
    fontWeight: "700",
    color: colors.root.secondary,
    marginTop: 2,
  },

  mapLocationLine: {
    height: 18,
    width: 1,
    backgroundColor: "#D8D8D8",
    marginLeft: 18,
    marginVertical: 3,
  },

  smallUserMarker: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#F1F2F2",
    alignItems: "center",
    justifyContent: "center",
  },

  smallDestinationMarker: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#EAF9F0",
    alignItems: "center",
    justifyContent: "center",
  },
});

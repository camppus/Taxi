import { Ionicons } from "@expo/vector-icons";
import MapView, { Marker, Polyline, Region } from "react-native-maps";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import colors from "@/styles/color";

type Coordinate = {
  latitude: number;
  longitude: number;
};

interface RouteMapProps {
  from: string;
  to: string;

  fromCoords: Coordinate;
  toCoords: Coordinate;

  routeCoords?: Coordinate[];

  title?: string;
  subtitle?: string;

  showHeader?: boolean;
  showBottomCard?: boolean;

  onBack?: () => void;
}

export default function RouteMap({
  from,
  to,
  fromCoords,
  toCoords,
  routeCoords = [],

  title = "Rota da viagem",
  subtitle,

  showHeader = true,
  showBottomCard = true,

  onBack,
}: RouteMapProps) {
  const initialRegion: Region = {
    latitude: (fromCoords.latitude + toCoords.latitude) / 2,
    longitude: (fromCoords.longitude + toCoords.longitude) / 2,
    latitudeDelta: Math.max(
      Math.abs(fromCoords.latitude - toCoords.latitude) * 2.2,
      0.03,
    ),
    longitudeDelta: Math.max(
      Math.abs(fromCoords.longitude - toCoords.longitude) * 2.2,
      0.03,
    ),
  };

  return (
    <View style={styles.container}>
      <MapView
        style={StyleSheet.absoluteFillObject}
        showsCompass={false}
        toolbarEnabled={false}
        showsTraffic={false}
        showsBuildings
        showsPointsOfInterest
        initialRegion={initialRegion}
      >
        {routeCoords.length > 1 && (
          <Polyline
            coordinates={routeCoords}
            strokeColor={colors.root.green}
            strokeWidth={5}
            lineCap="round"
            lineJoin="round"
          />
        )}

        <Marker
          coordinate={fromCoords}
          title="Partida"
          description={from}
          anchor={{ x: 0.5, y: 0.5 }}
        >
          <View style={styles.userMarker}>
            <Ionicons name="person" size={17} color={colors.root.secondary} />
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

      {showHeader && (
        <View style={styles.header}>
          {onBack && (
            <TouchableOpacity
              style={styles.closeButton}
              onPress={onBack}
              activeOpacity={0.8}
            >
              <Ionicons
                name="arrow-back"
                size={21}
                color={colors.root.secondary}
              />
            </TouchableOpacity>
          )}

          <View
            style={[styles.titleBox, !onBack && styles.titleBoxWithoutBack]}
          >
            <Text style={styles.title}>{title}</Text>

            <Text style={styles.subtitle} numberOfLines={1}>
              {subtitle ?? `${from} → ${to}`}
            </Text>
          </View>
        </View>
      )}

      {showBottomCard && (
        <View style={styles.bottomCard}>
          {/* PARTIDA */}
          <View style={styles.locationRow}>
            <View style={styles.smallUserMarker}>
              <Ionicons name="person" size={13} color={colors.root.secondary} />
            </View>

            <View style={styles.locationInfo}>
              <Text style={styles.locationLabel}>PARTIDA</Text>

              <Text style={styles.locationText} numberOfLines={2}>
                {from}
              </Text>
            </View>
          </View>

          <View style={styles.locationLine} />

          {/* DESTINO */}
          <View style={styles.locationRow}>
            <View style={styles.smallDestinationMarker}>
              <Ionicons name="location" size={18} color={colors.root.green} />
            </View>

            <View style={styles.locationInfo}>
              <Text style={styles.locationLabel}>DESTINO</Text>

              <Text style={styles.locationText} numberOfLines={2}>
                {to}
              </Text>
            </View>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 420,
    overflow: "hidden",
    borderRadius: 20,
    backgroundColor: "#E5E7EB",
  },

  header: {
    position: "absolute",
    top: 14,
    left: 14,
    right: 14,
    flexDirection: "row",
    alignItems: "center",
  },

  closeButton: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: "rgba(255,255,255,0.94)",
    alignItems: "center",
    justifyContent: "center",

    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 3,
    },

    elevation: 4,
  },

  titleBox: {
    minWidth: 0,
    flex: 1,
    marginLeft: 10,
    paddingHorizontal: 13,
    paddingVertical: 9,
    borderRadius: 14,
    backgroundColor: "rgba(255,255,255,0.94)",

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 3,
    },

    elevation: 3,
  },

  titleBoxWithoutBack: {
    marginLeft: 0,
  },

  title: {
    fontSize: 14,
    fontWeight: "900",
    color: colors.root.secondary,
  },

  subtitle: {
    marginTop: 2,
    fontSize: 11,
    color: "#777",
  },

  userMarker: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#FFFFFF",
    borderWidth: 3,
    borderColor: colors.root.secondary,
    alignItems: "center",
    justifyContent: "center",

    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },

    elevation: 5,
  },

  destinationPin: {
    alignItems: "center",
    justifyContent: "center",

    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },

    elevation: 5,
  },

  bottomCard: {
    position: "absolute",
    left: 12,
    right: 12,
    bottom: 12,

    backgroundColor: "rgba(255,255,255,0.96)",
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 13,

    shadowColor: "#000",
    shadowOpacity: 0.14,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 5,
    },

    elevation: 8,
  },

  locationRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  locationLine: {
    width: 1,
    height: 18,
    backgroundColor: "#D7DADF",
    marginLeft: 18,
    marginVertical: 2,
  },

  locationInfo: {
    flex: 1,
    marginLeft: 10,
  },

  locationLabel: {
    fontSize: 9,
    fontWeight: "900",
    letterSpacing: 0.5,
    color: "#999",
  },

  locationText: {
    marginTop: 3,
    fontSize: 12,
    fontWeight: "700",
    color: colors.root.secondary,
  },

  smallUserMarker: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: "#F1F3F4",
    alignItems: "center",
    justifyContent: "center",
  },

  smallDestinationMarker: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: "#EAF7F1",
    alignItems: "center",
    justifyContent: "center",
  },
});

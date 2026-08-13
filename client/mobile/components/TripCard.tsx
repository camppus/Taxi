import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View, StyleSheet, Image } from "react-native";

import colors from "@/styles/color";
import { Trips } from "@/types/Trips";

interface TripCardProps {
  trip: Trips;
  requestedSeats: number;
  onPress: () => void;
}

export function TripCard({ trip, requestedSeats, onPress }: TripCardProps) {
  const availableSeats = trip.publishedSeats ?? trip.vehicle.passengerSeats;

  const canFit = availableSeats >= requestedSeats;

  return (
    <TouchableOpacity
      style={styles.tripCard}
      activeOpacity={0.85}
      onPress={onPress}
    >
      <View style={styles.timeColumn}>
        <Image
          source={{ uri: trip.vehicle.image }}
          style={styles.vehicleImage}
          resizeMode="contain"
        />
        <Text style={styles.departureTime}>{trip.departureTime}</Text>
        <Text style={styles.departureLabel}>partida</Text>
      </View>

      <View style={styles.cardDivider} />

      <View style={styles.tripInfo}>
        <View style={styles.driverRow}>
          <View style={styles.driverAvatar}>
            <Ionicons name="person" size={18} color={colors.root.textTint} />
          </View>

          <View style={styles.driverInfo}>
            <Text style={styles.driverName}>{trip.driver.fullName}</Text>

            <View style={styles.ratingRow}>
              <Ionicons name="star" size={13} color="#F4B740" />

              <Text style={styles.rating}>4.9</Text>

              <Text style={styles.driverTrips}>· 48 viagens</Text>
            </View>
          </View>
        </View>

        {/* VEÍCULO */}
        <View style={styles.vehicleRow}>
          <Ionicons name="car-outline" size={18} color={colors.root.textTint} />

          <Text style={styles.vehicleName} numberOfLines={1}>
            {trip.vehicle.brand} {trip.vehicle.model}
          </Text>

          {/* LUGARES */}
          <View
            style={[styles.seatsBadge, !canFit && styles.seatsBadgeWarning]}
          >
            <Ionicons
              name="people-outline"
              size={13}
              color={canFit ? colors.root.green : "#D14343"}
            />

            <Text
              style={[styles.seatsText, !canFit && styles.seatsTextWarning]}
            >
              {availableSeats} lugares
            </Text>
          </View>
        </View>

        <Text style={styles.vehicleColor}>
          {trip.vehicle.color} · {trip.vehicle.plateNumber}
        </Text>
      </View>

      {/* PREÇO */}
      <View style={styles.priceColumn}>
        <Text style={styles.price}>
          {trip.priceBase.toLocaleString("pt-AO")}
        </Text>

        <Text style={styles.currency}>Kz</Text>

        <Ionicons
          name="chevron-forward"
          size={18}
          color="#B0B0B0"
          style={styles.cardArrow}
        />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.root.primary,
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
    paddingBottom: 10,
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
  vehicleImage: {
    width: "100%",
    aspectRatio: 1.6,
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
});

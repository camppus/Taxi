import React from "react";
import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Vehicle } from "@/types/Vehicle";
import {
  VEHICLE_STATUS_LABEL,
  VEHICLE_STATUS_COLOR,
  hasExpiringDocument,
} from "@/util/vehicle";
import color from "@/styles/color";

interface Props {
  vehicle: Vehicle;
  onPress: (vehicle: Vehicle) => void;
}

export default function VehicleCard({ vehicle, onPress }: Props) {
  const statusColor = VEHICLE_STATUS_COLOR[vehicle.status];
  const expiringDocs = hasExpiringDocument(vehicle);

  return (
    <Pressable onPress={() => onPress(vehicle)} style={styles.container}>
      <Image source={{ uri: vehicle.imageUrl }} style={styles.image} />

      <View style={styles.content}>
        <View style={styles.topRow}>
          <Text style={styles.name} numberOfLines={1}>
            {vehicle.name}
          </Text>

          {vehicle.isVerified ? (
            <Ionicons
              name="checkmark-circle"
              size={18}
              color={color.root.green}
            />
          ) : (
            <Ionicons name="time-outline" size={18} color="#D97706" />
          )}
        </View>

        <Text style={styles.subtitle} numberOfLines={1}>
          {vehicle.brand} {vehicle.model} · {vehicle.year} · {vehicle.color}
        </Text>

        <View style={styles.metaRow}>
          <View style={styles.plate}>
            <Text style={styles.plateText}>{vehicle.plateNumber}</Text>
          </View>

          <View style={styles.seatsRow}>
            <Ionicons name="people-outline" size={13} color="#8E8E93" />
            <Text style={styles.seatsText}>
              {vehicle.passengerSeats} lugares
            </Text>
          </View>
        </View>

        <View style={styles.bottomRow}>
          <View
            style={[
              styles.statusBadge,
              { backgroundColor: `${statusColor}1A` },
            ]}
          >
            <View
              style={[styles.statusDot, { backgroundColor: statusColor }]}
            />
            <Text style={[styles.statusText, { color: statusColor }]}>
              {VEHICLE_STATUS_LABEL[vehicle.status]}
            </Text>
          </View>

          {expiringDocs && (
            <View style={styles.warningBadge}>
              <Ionicons name="alert-circle-outline" size={12} color="#DC2626" />
              <Text style={styles.warningText}>Doc. a expirar</Text>
            </View>
          )}
        </View>
      </View>

      <Ionicons name="chevron-forward" size={18} color="#C7C7CC" />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#F0F0F2",
  },
  image: {
    width: 64,
    height: 64,
    borderRadius: 12,
    backgroundColor: "#E5E5EA",
    marginRight: 12,
  },
  content: {
    flex: 1,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  name: {
    fontSize: 15,
    fontWeight: "700",
    color: "#1C1C1E",
    flex: 1,
    marginRight: 8,
  },
  subtitle: {
    fontSize: 12,
    color: "#8E8E93",
    marginTop: 2,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    gap: 10,
  },
  plate: {
    backgroundColor: "#F2F2F7",
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  plateText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#1C1C1E",
    letterSpacing: 0.5,
  },
  seatsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  seatsText: {
    fontSize: 11,
    color: "#8E8E93",
  },
  bottomRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    gap: 8,
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 5,
  },
  statusText: {
    fontSize: 11,
    fontWeight: "700",
  },
  warningBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },
  warningText: {
    fontSize: 11,
    color: "#DC2626",
    fontWeight: "600",
  },
});

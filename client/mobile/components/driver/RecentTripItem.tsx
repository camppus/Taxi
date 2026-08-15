import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import color from "@/styles/color";
import { RecentTripSummary } from "@/types/DriverHome";

interface Props {
  trip: RecentTripSummary;
  onPress: (trip: RecentTripSummary) => void;
}

const STATUS_LABEL: Record<RecentTripSummary["status"], string> = {
  completed: "Concluída",
  cancelled: "Cancelada",
  scheduled: "Agendada",
};

const STATUS_COLOR: Record<RecentTripSummary["status"], string> = {
  completed: color.root.green,
  cancelled: "#FF3B30",
  scheduled: "#0A84FF",
};

function formatDate(date: Date): string {
  return date.toLocaleDateString("pt-BR", { day: "2-digit", month: "short" });
}

export default function RecentTripItem({ trip, onPress }: Props) {
  return (
    <Pressable onPress={() => onPress(trip)} style={styles.container}>
      <View style={styles.routeCol}>
        <View style={styles.routeLine}>
          <View style={[styles.dot, { backgroundColor: color.root.green }]} />
          <View style={styles.line} />
          <View style={[styles.dot, styles.dotSquare]} />
        </View>
      </View>

      <View style={styles.info}>
        <Text style={styles.origin} numberOfLines={1}>
          {trip.originName}
        </Text>
        <Text style={styles.destination} numberOfLines={1}>
          {trip.destinationName}
        </Text>
        <View style={styles.metaRow}>
          <Text style={styles.date}>{formatDate(trip.date)}</Text>
          <View
            style={[
              styles.statusBadge,
              { backgroundColor: `${STATUS_COLOR[trip.status]}1A` },
            ]}
          >
            <Text
              style={[styles.statusText, { color: STATUS_COLOR[trip.status] }]}
            >
              {STATUS_LABEL[trip.status]}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.rightCol}>
        {trip.price > 0 && (
          <Text style={styles.price}>
            {trip.price.toLocaleString("pt-BR")} Kz
          </Text>
        )}
        <Ionicons name="chevron-forward" size={16} color="#C7C7CC" />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 4,
  },
  routeCol: {
    marginRight: 10,
    alignItems: "center",
  },
  routeLine: {
    alignItems: "center",
    height: 40,
    justifyContent: "space-between",
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  dotSquare: {
    borderRadius: 2,
    backgroundColor: "#8E8E93",
  },
  line: {
    width: 1,
    flex: 1,
    backgroundColor: "#D1D1D6",
    marginVertical: 2,
  },
  info: {
    flex: 1,
  },
  origin: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1C1C1E",
  },
  destination: {
    fontSize: 13,
    color: "#8E8E93",
    marginTop: 2,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },
  date: {
    fontSize: 11,
    color: "#AEAEB2",
    marginRight: 8,
  },
  statusBadge: {
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  statusText: {
    fontSize: 10,
    fontWeight: "700",
  },
  rightCol: {
    alignItems: "flex-end",
  },
  price: {
    fontSize: 13,
    fontWeight: "700",
    color: "#1C1C1E",
    marginBottom: 4,
  },
});

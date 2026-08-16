import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  SafeAreaView,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import VehicleCard from "@/components/VehicleCard";
import { mockVehicles } from "@/mocks/mockVehicles";
import { Vehicle, VehicleStatus } from "@/types/Vehicle";
import { VEHICLE_STATUS_LABEL } from "@/util/vehicle";
import color from "@/styles/color";

type FilterOption = "ALL" | VehicleStatus;

const FILTERS: { key: FilterOption; label: string }[] = [
  { key: "ALL", label: "Todos" },
  { key: "ACTIVE", label: VEHICLE_STATUS_LABEL.ACTIVE },
  {
    key: "PENDING_VERIFICATION",
    label: VEHICLE_STATUS_LABEL.PENDING_VERIFICATION,
  },
  { key: "INACTIVE", label: VEHICLE_STATUS_LABEL.INACTIVE },
  { key: "SUSPENDED", label: VEHICLE_STATUS_LABEL.SUSPENDED },
];

export default function VehiclesScreen() {
  const router = useRouter();
  const vehicles: Vehicle[] = mockVehicles;
  const [filter, setFilter] = useState<FilterOption>("ALL");

  const filtered = useMemo(() => {
    if (filter === "ALL") return vehicles;
    return vehicles.filter((v) => v.status === filter);
  }, [vehicles, filter]);

  const activeCount = vehicles.filter((v) => v.status === "ACTIVE").length;
  const pendingCount = vehicles.filter(
    (v) => v.status === "PENDING_VERIFICATION",
  ).length;
  const totalSeats = vehicles
    .filter((v) => v.status === "ACTIVE")
    .reduce((total, vehicle) => total + vehicle.passengerSeats, 0);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Meus veículos</Text>
          <Text style={styles.subtitle}>
            {activeCount} de {vehicles.length} ativos
          </Text>
        </View>

        <Pressable
          style={styles.addButton}
          onPress={() => router.push("/(driver)/vehicles/register")}
        >
          <Ionicons name="add" size={22} color="#fff" />
        </Pressable>
      </View>

      <View style={styles.statsPanel}>
        <View style={styles.statItem}>
          <View style={[styles.statIcon, styles.statIconGreen]}>
            <Ionicons name="car-outline" size={18} color={color.root.green} />
          </View>
          <Text style={styles.statValue}>{activeCount}</Text>
          <Text style={styles.statLabel}>ativos</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <View style={[styles.statIcon, styles.statIconYellow]}>
            <Ionicons name="time-outline" size={18} color="#B7791F" />
          </View>
          <Text style={styles.statValue}>{pendingCount}</Text>
          <Text style={styles.statLabel}>em análise</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <View style={[styles.statIcon, styles.statIconBlue]}>
            <Ionicons name="people-outline" size={18} color="#2867B2" />
          </View>
          <Text style={styles.statValue}>{totalSeats}</Text>
          <Text style={styles.statLabel}>lugares</Text>
        </View>
      </View>

      <FlatList
        data={FILTERS}
        horizontal
        keyExtractor={(item) => item.key}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filtersRow}
        renderItem={({ item }) => {
          const isActive = filter === item.key;
          return (
            <Pressable
              onPress={() => setFilter(item.key)}
              style={[styles.filterChip, isActive && styles.filterChipActive]}
            >
              <Text
                style={[
                  styles.filterChipText,
                  isActive && styles.filterChipTextActive,
                ]}
              >
                {item.label}
              </Text>
            </Pressable>
          );
        }}
      />

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <VehicleCard
            vehicle={item}
            onPress={(vehicle) =>
              router.push(`/(driver)/vehicles/${vehicle.id}`)
            }
          />
        )}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Ionicons name="car-outline" size={44} color="#C7C7CC" />
            <Text style={styles.emptyText}>Nenhum veículo nesta categoria</Text>
          </View>
        }
        style={{
          marginTop: filter.length >= 4 ? -290 : 10,
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1C1C1E",
  },
  subtitle: {
    fontSize: 12,
    color: "#8E8E93",
    marginTop: 2,
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: color.root.green,
    alignItems: "center",
    justifyContent: "center",
  },
  statsPanel: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 10,
    marginBottom: 14,
    paddingVertical: 11,
    borderRadius: 17,
    borderWidth: 1,
    borderColor: "#EEEEEE",
    backgroundColor: "#FAFAFA",
  },
  statItem: { flex: 1, alignItems: "center" },
  statIcon: {
    width: 30,
    height: 30,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 4,
  },
  statIconGreen: { backgroundColor: "#EAF8F0" },
  statIconYellow: { backgroundColor: "#FFF3CF" },
  statIconBlue: { backgroundColor: "#EEF4FF" },
  statValue: { color: color.root.secondary, fontSize: 15, fontWeight: "800" },
  statLabel: { color: "#737373", fontSize: 10, marginTop: 2 },
  statDivider: { height: 45, width: 1, backgroundColor: "#E7E7E7" },
  filtersRow: {
    paddingHorizontal: 16,
    paddingBottom: 12,
    gap: 8,
    height: 40,
  },
  filterChip: {
    backgroundColor: "#F2F2F7",
    borderRadius: 20,
    paddingHorizontal: 14,
    height: 25,
    justifyContent: "center",
  },
  filterChipActive: {
    backgroundColor: color.root.green,
  },
  filterChipText: {
    fontSize: 11,
    fontWeight: "600",
    color: "#1C1C1E",
  },
  filterChipTextActive: {
    color: "#fff",
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
  empty: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 80,
  },
  emptyText: {
    marginTop: 12,
    color: "#8E8E93",
    fontSize: 14,
  },
});

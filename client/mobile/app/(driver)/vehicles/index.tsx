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
        style={{
          marginTop: filtered.length <= 4 ? -400 : 0,
        }}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Ionicons name="car-outline" size={44} color="#C7C7CC" />
            <Text style={styles.emptyText}>Nenhum veículo nesta categoria</Text>
          </View>
        }
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

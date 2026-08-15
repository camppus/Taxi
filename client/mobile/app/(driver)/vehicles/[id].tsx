import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Pressable,
  SafeAreaView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useLocalSearchParams, useRouter, Stack } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { mockVehicles } from "@/mocks/mockVehicles";
import { mockVehicleStats } from "@/mocks/mockVehicleStats";
import { VehicleDocumentTypeDto } from "@/types/Vehicle";
import {
  VEHICLE_STATUS_LABEL,
  VEHICLE_STATUS_COLOR,
  FUEL_TYPE_LABEL,
  TRANSMISSION_LABEL,
  DOCUMENT_TYPE_LABEL,
  formatDate,
} from "@/util/vehicle";
import DocumentRow from "@/components/vehicles/DocumentRow";
import color from "@/styles/color";

export default function VehicleDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);

  const vehicle = mockVehicles.find((v) => v.id === id);
  const stats = id ? mockVehicleStats[id] : undefined;

  if (!vehicle) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <Text style={styles.notFound}>Veículo não encontrado</Text>
      </SafeAreaView>
    );
  }

  const statusColor = VEHICLE_STATUS_COLOR[vehicle.status];

  function confirmDelete() {
    Alert.alert(
      "Eliminar veículo",
      `Tem certeza que deseja eliminar "${vehicle!.name}"? Esta ação não pode ser desfeita.`,
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Eliminar", style: "destructive", onPress: handleDelete },
      ],
    );
  }

  async function handleDelete() {
    setDeleting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 900));
      router.back();
    } finally {
      setDeleting(false);
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.heroWrap}>
          <Image source={{ uri: vehicle.imageUrl }} style={styles.hero} />

          <SafeAreaView style={styles.heroOverlay}>
            <Pressable onPress={() => router.back()} style={styles.roundButton}>
              <Ionicons name="chevron-back" size={22} color="#1C1C1E" />
            </Pressable>

            <Pressable
              onPress={() =>
                router.push(`/(driver)/vehicles/${vehicle.id}/edit`)
              }
              style={styles.roundButton}
            >
              <Ionicons name="create-outline" size={20} color="#1C1C1E" />
            </Pressable>
          </SafeAreaView>

          <View style={[styles.statusBadge, { backgroundColor: statusColor }]}>
            <Text style={styles.statusBadgeText}>
              {VEHICLE_STATUS_LABEL[vehicle.status]}
            </Text>
          </View>
        </View>

        <View style={styles.content}>
          {/* Título */}
          <View style={styles.titleRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{vehicle.name}</Text>
              <Text style={styles.subtitle}>
                {vehicle.brand} {vehicle.model} · {vehicle.year}
              </Text>
            </View>

            {vehicle.isVerified ? (
              <View style={styles.verifiedPill}>
                <Ionicons
                  name="checkmark-circle"
                  size={14}
                  color={color.root.green}
                />
                <Text style={styles.verifiedText}>Verificado</Text>
              </View>
            ) : (
              <View style={[styles.verifiedPill, styles.pendingPill]}>
                <Ionicons name="time-outline" size={14} color="#D97706" />
                <Text style={[styles.verifiedText, styles.pendingText]}>
                  Em análise
                </Text>
              </View>
            )}
          </View>

          {vehicle.description && (
            <Text style={styles.description}>{vehicle.description}</Text>
          )}

          {/* Stats simples do veículo */}
          {stats && (
            <View style={styles.statsRow}>
              <View style={styles.statCard}>
                <Ionicons
                  name="checkmark-done-outline"
                  size={16}
                  color={color.root.green}
                />
                <Text style={styles.statValue}>{stats.tripsCompleted}</Text>
                <Text style={styles.statLabel}>Viagens</Text>
              </View>
              <View style={styles.statCard}>
                <Ionicons
                  name="star-outline"
                  size={16}
                  color={color.root.green}
                />
                <Text style={styles.statValue}>
                  {stats.rating > 0 ? stats.rating.toFixed(1) : "—"}
                </Text>
                <Text style={styles.statLabel}>Avaliação</Text>
              </View>
              <View style={styles.statCard}>
                <Ionicons
                  name="wallet-outline"
                  size={16}
                  color={color.root.green}
                />
                <Text style={styles.statValue}>
                  {stats.earningsThisMonth.toLocaleString("pt-BR")} Kz
                </Text>
                <Text style={styles.statLabel}>Este mês</Text>
              </View>
            </View>
          )}

          {/* Ficha técnica */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Detalhes</Text>
            <View style={styles.detailsGrid}>
              <DetailItem label="Matrícula" value={vehicle.plateNumber} />
              <DetailItem label="Cor" value={vehicle.color} />
              <DetailItem
                label="Lugares"
                value={`${vehicle.passengerSeats} passageiros (${vehicle.totalSeats} total)`}
              />
              <DetailItem
                label="Combustível"
                value={FUEL_TYPE_LABEL[vehicle.fuelType]}
              />
              <DetailItem
                label="Câmbio"
                value={TRANSMISSION_LABEL[vehicle.transmission]}
              />
              {vehicle.verifiedAt && (
                <DetailItem
                  label="Verificado em"
                  value={formatDate(vehicle.verifiedAt)}
                />
              )}
            </View>
          </View>

          {/* Documentos */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Documentos</Text>
            <View style={styles.documentsCard}>
              <DocumentRow
                label={DOCUMENT_TYPE_LABEL[VehicleDocumentTypeDto.REGISTRATION]}
                document={vehicle.document[VehicleDocumentTypeDto.REGISTRATION]}
              />
              <View style={styles.separator} />
              <DocumentRow
                label={DOCUMENT_TYPE_LABEL[VehicleDocumentTypeDto.INSURANCE]}
                document={vehicle.document[VehicleDocumentTypeDto.INSURANCE]}
              />
              <View style={styles.separator} />
              <DocumentRow
                label={DOCUMENT_TYPE_LABEL[VehicleDocumentTypeDto.INSPECTION]}
                document={vehicle.document[VehicleDocumentTypeDto.INSPECTION]}
              />
              <View style={styles.separator} />
              <DocumentRow
                label={DOCUMENT_TYPE_LABEL[VehicleDocumentTypeDto.PHOTO]}
                document={vehicle.document[VehicleDocumentTypeDto.PHOTO]}
              />
            </View>
          </View>

          {/* Ações */}
          <View style={styles.actions}>
            <Pressable
              style={styles.editButton}
              onPress={() =>
                router.push(`/(driver)/vehicles/${vehicle.id}/edit`)
              }
            >
              <Ionicons name="create-outline" size={18} color="#fff" />
              <Text style={styles.editButtonText}>Editar veículo</Text>
            </Pressable>

            <Pressable
              style={styles.deleteButton}
              onPress={confirmDelete}
              disabled={deleting}
            >
              {deleting ? (
                <ActivityIndicator color="#DC2626" size="small" />
              ) : (
                <>
                  <Ionicons name="trash-outline" size={18} color="#DC2626" />
                  <Text style={styles.deleteButtonText}>Eliminar veículo</Text>
                </>
              )}
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function DetailItem({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.detailItem}>
      <Text style={styles.detailLabel}>{label}</Text>
      <Text style={styles.detailValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  notFound: {
    textAlign: "center",
    marginTop: 40,
    color: "#8E8E93",
  },
  heroWrap: {
    position: "relative",
  },
  hero: {
    width: "100%",
    height: 240,
    backgroundColor: "#E5E5EA",
  },
  heroOverlay: {
    position: "absolute",
    top: 4,
    left: 4,
    right: 4,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  roundButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.9)",
    alignItems: "center",
    justifyContent: "center",
  },
  statusBadge: {
    position: "absolute",
    bottom: 12,
    left: 16,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  statusBadgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "700",
  },
  content: {
    padding: 16,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  name: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1C1C1E",
  },
  subtitle: {
    fontSize: 13,
    color: "#8E8E93",
    marginTop: 2,
  },
  verifiedPill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#DCFCE7",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    gap: 4,
  },
  pendingPill: {
    backgroundColor: "#FEF3C7",
  },
  verifiedText: {
    fontSize: 11,
    fontWeight: "700",
    color: color.root.green,
  },
  pendingText: {
    color: "#D97706",
  },
  description: {
    fontSize: 13,
    color: "#6B7280",
    marginTop: 10,
    lineHeight: 19,
  },
  statsRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 18,
  },
  statCard: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: "#F0F0F2",
  },
  statValue: {
    fontSize: 15,
    fontWeight: "700",
    color: "#1C1C1E",
    marginTop: 6,
  },
  statLabel: {
    fontSize: 10,
    color: "#8E8E93",
    marginTop: 1,
  },
  section: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#1C1C1E",
    marginBottom: 10,
  },
  detailsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  detailItem: {
    width: "47%",
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
    padding: 10,
  },
  detailLabel: {
    fontSize: 11,
    color: "#8E8E93",
  },
  detailValue: {
    fontSize: 13,
    fontWeight: "600",
    color: "#1C1C1E",
    marginTop: 2,
  },
  documentsCard: {
    backgroundColor: "#fff",
    borderRadius: 14,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#F0F0F2",
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "#E5E5EA",
  },
  actions: {
    marginTop: 28,
    gap: 10,
    marginBottom: 80,
  },
  editButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: color.root.green,
    borderRadius: 14,
    paddingVertical: 14,
  },
  editButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "700",
  },
  deleteButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "#FEF2F2",
    borderRadius: 14,
    paddingVertical: 14,
  },
  deleteButtonText: {
    color: "#DC2626",
    fontSize: 14,
    fontWeight: "700",
  },
});

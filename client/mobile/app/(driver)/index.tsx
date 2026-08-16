import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Pressable,
  SafeAreaView,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import color from "@/styles/color";
import { getInitials } from "@/util/lib";
import VerificationBanner from "@/components/driver/VerificationBanner";
import QuickActionCard from "@/components/driver/QuickActionCard";
import StatCard from "@/components/driver/StatCard";
import RecentTripItem from "@/components/driver/RecentTripItem";
import { mockDriverProfile, mockRecentTrips } from "@/mocks/Mockdriverhome";
import { mockVehicles } from "@/mocks/mockVehicles";
import { RecentTripSummary } from "@/types/DriverHome";

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Bom dia";
  if (hour < 18) return "Boa tarde";
  return "Boa noite";
}

const weeklyActivity = [
  { day: "Seg", value: 36 },
  { day: "Ter", value: 54 },
  { day: "Qua", value: 42 },
  { day: "Qui", value: 76 },
  { day: "Sex", value: 67 },
  { day: "Sáb", value: 92 },
  { day: "Dom", value: 58 },
];

export default function DriverHomeScreen() {
  const router = useRouter();
  const driver = mockDriverProfile;
  const firstName = driver.fullName.split(" ")[0];

  const needsVerification = !driver.isVerified;
  const activeVehicles = mockVehicles.filter(
    (vehicle) => vehicle.status === "ACTIVE",
  ).length;
  const pendingVehicles = mockVehicles.filter(
    (vehicle) => vehicle.status === "PENDING_VERIFICATION",
  ).length;
  const fleetSeats = mockVehicles
    .filter((vehicle) => vehicle.status === "ACTIVE")
    .reduce((total, vehicle) => total + vehicle.passengerSeats, 0);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>{getGreeting()},</Text>
            <Text style={styles.name}>{firstName} 👋</Text>
          </View>

          <Pressable onPress={() => router.push("/(driver)/profile")}>
            {driver.photoUrl ? (
              <Image source={{ uri: driver.photoUrl }} style={styles.avatar} />
            ) : (
              <View style={styles.avatarPlaceholder}>
                <Text style={styles.avatarPlaceholderText}>
                  {getInitials(driver.fullName)}
                </Text>
              </View>
            )}
          </Pressable>
        </View>

        {needsVerification && (
          <VerificationBanner
            pending={driver.verificationPending}
            onPress={() => router.push("/(driver)/verification/documents")}
          />
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>O que deseja fazer?</Text>
          <View style={styles.quickActionsRow}>
            <QuickActionCard
              icon="add-circle-outline"
              label="Criar viagem"
              disabled={needsVerification}
              onPress={() => router.push("/(driver)/trips/create")}
            />
            <QuickActionCard
              icon="car-outline"
              label="Registrar veículo"
              onPress={() => router.push("/(driver)/vehicles/register")}
            />
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>A sua frota</Text>
            <Pressable onPress={() => router.push("/(driver)/vehicles")}>
              <Text style={styles.seeAll}>Gerir veículos</Text>
            </Pressable>
          </View>
          <Pressable
            style={styles.fleetSummary}
            onPress={() => router.push("/(driver)/vehicles")}
          >
            <View style={styles.fleetIcon}>
              <Ionicons
                name="car-sport-outline"
                size={24}
                color={color.root.green}
              />
            </View>
            <View style={styles.fleetMain}>
              <Text style={styles.fleetValue}>
                {activeVehicles} veículo{activeVehicles !== 1 ? "s" : ""} ativo
                {activeVehicles !== 1 ? "s" : ""}
              </Text>
              <Text style={styles.fleetText}>
                {fleetSeats} lugares disponíveis na sua frota
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={19} color="#9CA3AF" />
          </Pressable>
          <View style={styles.fleetStatsRow}>
            <View style={styles.fleetStat}>
              <Ionicons
                name="checkmark-circle-outline"
                size={16}
                color={color.root.green}
              />
              <Text style={styles.fleetStatValue}>{activeVehicles}</Text>
              <Text style={styles.fleetStatLabel}>ativos</Text>
            </View>
            <View style={styles.fleetStatDivider} />
            <View style={styles.fleetStat}>
              <Ionicons name="time-outline" size={16} color="#B7791F" />
              <Text style={styles.fleetStatValue}>{pendingVehicles}</Text>
              <Text style={styles.fleetStatLabel}>em análise</Text>
            </View>
            <View style={styles.fleetStatDivider} />
            <View style={styles.fleetStat}>
              <Ionicons name="people-outline" size={16} color="#2867B2" />
              <Text style={styles.fleetStatValue}>{fleetSeats}</Text>
              <Text style={styles.fleetStatLabel}>lugares</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Seu desempenho</Text>
          <View style={styles.statsRow}>
            <StatCard
              icon="checkmark-done-outline"
              value={String(driver.stats.tripsCompleted)}
              label="Viagens"
            />
            <StatCard
              icon="star-outline"
              value={driver.stats.rating.toFixed(1)}
              label="Avaliação"
            />
            <StatCard
              icon="alert-circle-outline"
              value={driver.stats.rating.toFixed(1)}
              label="Reclamações"
            />
            <StatCard
              icon="wallet-outline"
              value={`${driver.stats.earningsThisWeek.toLocaleString("pt-BR")} Kz`}
              label="Este mês"
            />
          </View>
        </View>

        <View style={styles.section}>
          <Pressable
            style={styles.performanceCard}
            onPress={() => router.push("/(driver)/bookings")}
          >
            <View style={styles.performanceHeader}>
              <View>
                <Text style={styles.performanceEyebrow}>
                  DESEMPENHO SEMANAL
                </Text>
                <Text style={styles.performanceTitle}>212.500 Kz</Text>
                <View style={styles.growthRow}>
                  <Ionicons
                    name="trending-up-outline"
                    size={14}
                    color="#278653"
                  />
                  <Text style={styles.growthText}>
                    18% acima da semana passada
                  </Text>
                </View>
              </View>
              <View style={styles.chartIcon}>
                <Ionicons
                  name="bar-chart-outline"
                  size={22}
                  color={color.root.green}
                />
              </View>
            </View>

            <View style={styles.miniChart}>
              {weeklyActivity.map((item) => (
                <View key={item.day} style={styles.miniBarGroup}>
                  <View style={styles.miniBarTrack}>
                    <View
                      style={[styles.miniBar, { height: `${item.value}%` }]}
                    />
                  </View>
                  <Text style={styles.miniBarLabel}>{item.day}</Text>
                </View>
              ))}
            </View>

            <View style={styles.performanceFooter}>
              <View>
                <Text style={styles.footerMetricValue}>
                  {driver.stats.acceptanceRate}%
                </Text>
                <Text style={styles.footerMetricLabel}>aceitação</Text>
              </View>
              <View style={styles.footerDivider} />
              <View>
                <Text style={styles.footerMetricValue}>4 min</Text>
                <Text style={styles.footerMetricLabel}>resposta média</Text>
              </View>
              <View style={styles.viewAnalytics}>
                <Text style={styles.viewAnalyticsText}>Análises</Text>
                <Ionicons
                  name="arrow-forward"
                  size={14}
                  color={color.root.green}
                />
              </View>
            </View>
          </Pressable>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>Viagens recentes</Text>
            <Pressable onPress={() => router.push("/(driver)/trips")}>
              <Text style={styles.seeAll}>Ver todas</Text>
            </Pressable>
          </View>

          <View style={styles.recentTripsCard}>
            {mockRecentTrips.length === 0 ? (
              <Text style={styles.emptyText}>
                Você ainda não tem viagens recentes.
              </Text>
            ) : (
              mockRecentTrips.map((trip: RecentTripSummary, index) => (
                <React.Fragment key={trip.id}>
                  <RecentTripItem
                    trip={trip}
                    onPress={(t) => router.push(`/(driver)/trips/${t.id}`)}
                  />
                  {index < mockRecentTrips.length - 1 && (
                    <View style={styles.separator} />
                  )}
                </React.Fragment>
              ))
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    paddingBottom: 100,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16,
  },
  greeting: {
    fontSize: 14,
    color: "#8E8E93",
  },
  name: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1C1C1E",
    marginTop: 2,
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: "#E5E5EA",
  },
  avatarPlaceholder: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: "#E5E7EB",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarPlaceholderText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#374151",
  },
  section: {
    marginTop: 20,
    paddingHorizontal: 16,
  },
  sectionHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#1C1C1E",
    marginBottom: 10,
  },
  seeAll: {
    fontSize: 13,
    fontWeight: "600",
    color: color.root.green,
  },
  quickActionsRow: {
    flexDirection: "row",
    gap: 10,
  },
  fleetSummary: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 18,
    padding: 14,
    backgroundColor: "#F7FBF8",
    borderWidth: 1,
    borderColor: "#DDEFE2",
  },
  fleetIcon: {
    width: 45,
    height: 45,
    borderRadius: 14,
    backgroundColor: "#E7F7EC",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 11,
  },
  fleetMain: { flex: 1 },
  fleetValue: { color: color.root.secondary, fontSize: 14, fontWeight: "800" },
  fleetText: { color: "#587063", fontSize: 11, marginTop: 3 },
  fleetStatsRow: {
    marginTop: 8,
    borderRadius: 14,
    backgroundColor: "#FAFAFA",
    borderWidth: 1,
    borderColor: "#F0F0F0",
    paddingVertical: 9,
    flexDirection: "row",
    alignItems: "center",
  },
  fleetStat: { flex: 1, alignItems: "center", gap: 2 },
  fleetStatValue: {
    color: color.root.secondary,
    fontSize: 14,
    fontWeight: "800",
  },
  fleetStatLabel: { color: "#737373", fontSize: 10 },
  fleetStatDivider: { width: 1, height: 30, backgroundColor: "#E6E6E6" },
  statsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  performanceCard: {
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: "#DDEFE2",
    backgroundColor: "#F7FBF8",
  },
  performanceHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  performanceEyebrow: {
    fontSize: 10,
    fontWeight: "800",
    color: "#587063",
    letterSpacing: 0.8,
  },
  performanceTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: color.root.secondary,
    marginTop: 5,
  },
  growthRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 4,
  },
  growthText: { fontSize: 11, color: "#278653", fontWeight: "700" },
  chartIcon: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: "#E7F7EC",
    alignItems: "center",
    justifyContent: "center",
  },
  miniChart: {
    height: 100,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginTop: 14,
    paddingTop: 6,
    borderBottomWidth: 1,
    borderBottomColor: "#DDEBE1",
  },
  miniBarGroup: {
    width: "10%",
    height: "100%",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  miniBarTrack: {
    height: 72,
    width: 15,
    borderRadius: 8,
    overflow: "hidden",
    justifyContent: "flex-end",
    backgroundColor: "#E4F0E7",
  },
  miniBar: {
    width: "100%",
    borderRadius: 8,
    backgroundColor: color.root.green,
  },
  miniBarLabel: { fontSize: 9, color: "#6B7C70", marginTop: 5 },
  performanceFooter: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 14,
  },
  footerMetricValue: {
    color: color.root.secondary,
    fontSize: 13,
    fontWeight: "800",
  },
  footerMetricLabel: { color: "#737373", fontSize: 10, marginTop: 2 },
  footerDivider: {
    width: 1,
    height: 27,
    backgroundColor: "#DDEBE1",
    marginHorizontal: 15,
  },
  viewAnalytics: {
    marginLeft: "auto",
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },
  viewAnalyticsText: {
    color: color.root.green,
    fontWeight: "800",
    fontSize: 11,
  },
  recentTripsCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#F0F0F2",
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "#E5E5EA",
  },
  emptyText: {
    fontSize: 13,
    color: "#8E8E93",
    textAlign: "center",
    paddingVertical: 20,
  },
});

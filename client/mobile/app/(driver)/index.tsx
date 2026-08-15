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
import color from "@/styles/color";
import { getInitials } from "@/util/lib";
import VerificationBanner from "@/components/driver/VerificationBanner";
import QuickActionCard from "@/components/driver/QuickActionCard";
import StatCard from "@/components/driver/StatCard";
import RecentTripItem from "@/components/driver/RecentTripItem";
import { mockDriverProfile, mockRecentTrips } from "@/mocks/Mockdriverhome";
import { RecentTripSummary } from "@/types/DriverHome";

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Bom dia";
  if (hour < 18) return "Boa tarde";
  return "Boa noite";
}

export default function DriverHomeScreen() {
  const router = useRouter();
  const driver = mockDriverProfile;
  const firstName = driver.fullName.split(" ")[0];

  const needsVerification = !driver.isVerified;

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
  statsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
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

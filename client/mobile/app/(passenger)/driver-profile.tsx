import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { mockTrips } from "@/mocks/trip";
import colors from "@/styles/color";
import { handleCall } from "@/util/lib";

const mockDriverStats = {
  rating: 4.9,
  totalTrips: 328,
  completedTrips: 312,
  yearsDriving: 7,
  responseRate: 96,
};

const mockReviews = [
  {
    id: "review-1",
    name: "Miguel António",
    rating: 5,
    comment: "Motorista muito educado, chegou no horário e conduziu muito bem.",
    date: "Há 2 dias",
  },
  {
    id: "review-2",
    name: "Ana Maria",
    rating: 5,
    comment: "Excelente viagem. Carro limpo e muito confortável.",
    date: "Há 5 dias",
  },
  {
    id: "review-3",
    name: "Paulo José",
    rating: 4,
    comment: "Boa experiência. Foi pontual e bastante profissional.",
    date: "Há 1 semana",
  },
  {
    id: "review-4",
    name: "Carla Francisco",
    rating: 5,
    comment: "Muito simpático e atencioso durante toda a viagem.",
    date: "Há 2 semanas",
  },
];

export default function DriverProfilePage() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const trip = mockTrips[0];

  const driver = trip?.driver;

  if (!driver) {
    return (
      <View style={styles.errorContainer}>
        <Ionicons name="person-outline" size={46} color="#D14343" />

        <Text style={styles.errorTitle}>Motorista não encontrado</Text>

        <Text style={styles.errorDescription}>
          Não foi possível carregar o perfil deste motorista.
        </Text>

        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backButtonText}>Voltar</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* HEADER */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.iconButton}>
          <Ionicons
            name="chevron-back"
            size={24}
            color={colors.root.secondary}
          />
        </Pressable>

        <Text style={styles.headerTitle}>Perfil do motorista</Text>

        <View style={{ width: 42 }} />
      </View>

      {/* PROFILE HERO */}
      <View style={styles.heroCard}>
        <View style={styles.avatarWrapper}>
          {driver.photoUrl ? (
            <Image source={{ uri: driver.photoUrl }} style={styles.avatar} />
          ) : (
            <View style={styles.avatarPlaceholder}>
              <Ionicons name="person" size={42} color={colors.root.secondary} />
            </View>
          )}

          <View style={styles.verifiedBadge}>
            <Ionicons name="checkmark" size={13} color="#fff" />
          </View>
        </View>

        <Text style={styles.driverName}>{driver.fullName}</Text>

        <View style={styles.verifiedRow}>
          <Ionicons
            name="shield-checkmark"
            size={17}
            color={colors.root.green}
          />

          <Text style={styles.verifiedText}>Motorista verificado</Text>
        </View>

        <View style={styles.ratingRow}>
          <Ionicons name="star" size={20} color="#F59E0B" />

          <Text style={styles.ratingValue}>{mockDriverStats.rating}</Text>

          <Text style={styles.ratingCount}>
            ({mockReviews.length * 74} avaliações)
          </Text>
        </View>
      </View>

      {/* STATS */}
      <View style={styles.statsCard}>
        <Stat
          icon="car-outline"
          value={`${mockDriverStats.totalTrips}`}
          label="Viagens"
        />

        <View style={styles.statsSeparator} />

        <Stat
          icon="checkmark-circle-outline"
          value={`${mockDriverStats.completedTrips}`}
          label="Concluídas"
        />

        <View style={styles.statsSeparator} />

        <Stat
          icon="time-outline"
          value={`${mockDriverStats.yearsDriving} anos`}
          label="Experiência"
        />
      </View>

      {/* ABOUT */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Sobre o motorista</Text>

        <View style={styles.card}>
          <InfoRow icon="call-outline" label="Telefone" value={driver.phone} />

          <View style={styles.separator} />

          <InfoRow
            icon="male-female-outline"
            label="Género"
            value={String(driver.gender)}
          />

          <View style={styles.separator} />

          <InfoRow
            icon="calendar-outline"
            label="Data de nascimento"
            value={driver.birthDate}
          />

          <View style={styles.separator} />

          <InfoRow
            icon="stats-chart-outline"
            label="Taxa de resposta"
            value={`${mockDriverStats.responseRate}%`}
          />
        </View>
      </View>

      {/* VERIFIED */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Verificação</Text>

        <View style={styles.verificationCard}>
          <View style={styles.verificationIcon}>
            <Ionicons
              name="shield-checkmark"
              size={24}
              color={colors.root.green}
            />
          </View>

          <View style={styles.verificationContent}>
            <Text style={styles.verificationTitle}>Perfil verificado</Text>

            <Text style={styles.verificationDescription}>
              Identidade e informações do motorista verificadas pela MandaVir.
            </Text>
          </View>

          <Ionicons
            name="checkmark-circle"
            size={22}
            color={colors.root.green}
          />
        </View>
      </View>

      {/* VEHICLE */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Veículo utilizado</Text>

        <View style={styles.vehicleCard}>
          <Image
            source={{
              uri: trip.vehicle.image,
            }}
            style={styles.vehicleImage}
          />

          <View style={styles.vehicleContent}>
            <Text style={styles.vehicleName}>
              {trip.vehicle.brand} {trip.vehicle.model}
            </Text>

            <Text style={styles.vehicleDescription}>
              {trip.vehicle.description}
            </Text>

            <View style={styles.vehicleMeta}>
              <VehicleTag
                icon="calendar-outline"
                value={`${trip.vehicle.year}`}
              />

              <VehicleTag
                icon="color-palette-outline"
                value={trip.vehicle.color}
              />

              <VehicleTag
                icon="people-outline"
                value={`${trip.vehicle.passengerSeats} lugares`}
              />
            </View>
          </View>
        </View>
      </View>

      {/* REVIEWS */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Avaliações</Text>

          <View style={styles.reviewSummary}>
            <Ionicons name="star" size={14} color="#F59E0B" />

            <Text style={styles.reviewSummaryValue}>
              {mockDriverStats.rating}
            </Text>
          </View>
        </View>

        <View style={styles.reviewsCard}>
          {mockReviews.map((review, index) => (
            <View key={review.id}>
              <View style={styles.reviewRow}>
                <View style={styles.reviewAvatar}>
                  <Text style={styles.reviewAvatarText}>
                    {getInitials(review.name)}
                  </Text>
                </View>

                <View style={styles.reviewContent}>
                  <View style={styles.reviewTop}>
                    <Text style={styles.reviewerName}>{review.name}</Text>

                    <Text style={styles.reviewDate}>{review.date}</Text>
                  </View>

                  <View style={styles.stars}>
                    {Array.from({ length: 5 }).map((_, starIndex) => (
                      <Ionicons
                        key={starIndex}
                        name={
                          starIndex < review.rating ? "star" : "star-outline"
                        }
                        size={13}
                        color="#F59E0B"
                      />
                    ))}
                  </View>

                  <Text style={styles.reviewText}>{review.comment}</Text>
                </View>
              </View>

              {index !== mockReviews.length - 1 && (
                <View style={styles.separator} />
              )}
            </View>
          ))}
        </View>

        <Pressable style={styles.allReviewsButton}>
          <Text style={styles.allReviewsText}>Ver todas as avaliações</Text>

          <Ionicons
            name="chevron-forward"
            size={17}
            color={colors.root.green}
          />
        </Pressable>
      </View>

      {/* ACTIONS */}
      <View style={styles.actions}>
        <Pressable
          style={({ pressed }) => [
            styles.actionButton,
            pressed && styles.pressed,
          ]}
        >
          <Ionicons
            name="chatbubble-outline"
            size={19}
            color={colors.root.secondary}
          />

          <Text style={styles.actionText}>Conversar</Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            styles.actionButton,
            styles.actionButtonPrimary,
            pressed && styles.pressed,
          ]}
          onPress={() => {
            handleCall(trip.driver.phone);
          }}
        >
          <Ionicons name="call-outline" size={19} color={colors.root.primary} />

          <Text style={[styles.actionText, styles.actionTextPrimary]}>
            Ligar
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

function Stat({
  icon,
  value,
  label,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  value: string;
  label: string;
}) {
  return (
    <View style={styles.stat}>
      <Ionicons name={icon} size={20} color={colors.root.green} />

      <Text style={styles.statValue}>{value}</Text>

      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value: string;
}) {
  return (
    <View style={styles.infoRow}>
      <View style={styles.infoIcon}>
        <Ionicons name={icon} size={18} color={colors.root.secondary} />
      </View>

      <View style={styles.infoContent}>
        <Text style={styles.infoLabel}>{label}</Text>

        <Text style={styles.infoValue}>{value}</Text>
      </View>
    </View>
  );
}

function VehicleTag({
  icon,
  value,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  value: string;
}) {
  return (
    <View style={styles.vehicleTag}>
      <Ionicons name={icon} size={13} color="#777" />

      <Text style={styles.vehicleTagText}>{value}</Text>
    </View>
  );
}

function getInitials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },

  content: {
    paddingHorizontal: 16,
    paddingTop: 18,
    paddingBottom: 40,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 18,
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: colors.root.secondary,
  },

  iconButton: {
    width: 42,
    height: 42,
    borderRadius: 13,
    backgroundColor: colors.root.primary,
    alignItems: "center",
    justifyContent: "center",
  },

  heroCard: {
    backgroundColor: colors.root.primary,
    borderRadius: 22,
    alignItems: "center",
    paddingVertical: 24,
    paddingHorizontal: 18,
    marginBottom: 12,
  },

  avatarWrapper: {
    position: "relative",
  },

  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },

  avatarPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#EEF0F2",
    alignItems: "center",
    justifyContent: "center",
  },

  verifiedBadge: {
    position: "absolute",
    right: 1,
    bottom: 3,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.root.green,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: colors.root.primary,
  },

  driverName: {
    marginTop: 14,
    fontSize: 22,
    fontWeight: "900",
    color: colors.root.secondary,
  },

  verifiedRow: {
    marginTop: 7,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },

  verifiedText: {
    fontSize: 12,
    fontWeight: "800",
    color: colors.root.green,
  },

  ratingRow: {
    marginTop: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },

  ratingValue: {
    fontSize: 17,
    fontWeight: "900",
    color: colors.root.secondary,
  },

  ratingCount: {
    fontSize: 11,
    color: "#888",
  },

  statsCard: {
    backgroundColor: colors.root.secondary,
    borderRadius: 18,
    minHeight: 90,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 26,
  },

  stat: {
    flex: 1,
    alignItems: "center",
  },

  statValue: {
    marginTop: 5,
    fontSize: 16,
    fontWeight: "900",
    color: colors.root.primary,
  },

  statLabel: {
    marginTop: 2,
    fontSize: 10,
    color: "rgba(255,255,255,0.55)",
  },

  statsSeparator: {
    height: 45,
    width: 1,
    backgroundColor: "rgba(255,255,255,0.12)",
  },

  section: {
    marginBottom: 24,
  },

  sectionTitle: {
    fontSize: 14,
    fontWeight: "800",
    color: colors.root.secondary,
    marginBottom: 10,
  },

  card: {
    backgroundColor: colors.root.primary,
    borderRadius: 18,
    paddingHorizontal: 15,
    overflow: "hidden",
  },

  infoRow: {
    minHeight: 66,
    flexDirection: "row",
    alignItems: "center",
  },

  infoIcon: {
    width: 38,
    height: 38,
    borderRadius: 11,
    backgroundColor: "#F1F3F4",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  infoContent: {
    flex: 1,
  },

  infoLabel: {
    fontSize: 10,
    fontWeight: "700",
    color: "#999",
  },

  infoValue: {
    marginTop: 3,
    fontSize: 13,
    fontWeight: "700",
    color: colors.root.secondary,
  },

  separator: {
    height: 1,
    backgroundColor: "#EEEEEE",
  },

  verificationCard: {
    backgroundColor: "#EFFAF4",
    borderRadius: 18,
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
  },

  verificationIcon: {
    width: 44,
    height: 44,
    borderRadius: 13,
    backgroundColor: "#DDF5E8",
    alignItems: "center",
    justifyContent: "center",
  },

  verificationContent: {
    flex: 1,
    marginLeft: 12,
    marginRight: 8,
  },

  verificationTitle: {
    fontSize: 13,
    fontWeight: "900",
    color: colors.root.secondary,
  },

  verificationDescription: {
    marginTop: 4,
    fontSize: 11,
    lineHeight: 16,
    color: "#6F7B73",
  },

  vehicleCard: {
    backgroundColor: colors.root.primary,
    borderRadius: 18,
    padding: 12,
    flexDirection: "row",
  },

  vehicleImage: {
    width: 116,
    height: 84,
    borderRadius: 14,
    backgroundColor: "#EFEFEF",
  },

  vehicleContent: {
    flex: 1,
    marginLeft: 12,
  },

  vehicleName: {
    fontSize: 14,
    fontWeight: "900",
    color: colors.root.secondary,
  },

  vehicleDescription: {
    marginTop: 4,
    fontSize: 11,
    lineHeight: 16,
    color: "#888",
  },

  vehicleMeta: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 7,
    marginTop: 10,
  },

  vehicleTag: {
    minHeight: 25,
    paddingHorizontal: 8,
    borderRadius: 8,
    backgroundColor: "#F3F4F4",
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },

  vehicleTagText: {
    fontSize: 9,
    fontWeight: "700",
    color: "#777",
  },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  reviewSummary: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginBottom: 10,
  },

  reviewSummaryValue: {
    fontSize: 13,
    fontWeight: "900",
    color: colors.root.secondary,
  },

  reviewsCard: {
    backgroundColor: colors.root.primary,
    borderRadius: 18,
    paddingHorizontal: 15,
  },

  reviewRow: {
    flexDirection: "row",
    paddingVertical: 15,
  },

  reviewAvatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#EAF7F1",
    alignItems: "center",
    justifyContent: "center",
  },

  reviewAvatarText: {
    fontSize: 12,
    fontWeight: "900",
    color: colors.root.green,
  },

  reviewContent: {
    flex: 1,
    marginLeft: 10,
  },

  reviewTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  reviewerName: {
    flex: 1,
    fontSize: 12,
    fontWeight: "800",
    color: colors.root.secondary,
  },

  reviewDate: {
    fontSize: 9,
    color: "#999",
  },

  stars: {
    flexDirection: "row",
    gap: 2,
    marginTop: 5,
  },

  reviewText: {
    marginTop: 7,
    fontSize: 11,
    lineHeight: 17,
    color: "#666",
  },

  allReviewsButton: {
    height: 46,
    marginTop: 8,
    borderRadius: 13,
    backgroundColor: "#EEF8F3",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },

  allReviewsText: {
    fontSize: 12,
    fontWeight: "800",
    color: colors.root.green,
  },

  actions: {
    flexDirection: "row",
    gap: 9,
    marginTop: 2,
    marginBottom: 90,
  },

  actionButton: {
    flex: 1,
    height: 50,
    borderRadius: 14,
    backgroundColor: colors.root.primary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
  },

  actionButtonPrimary: {
    backgroundColor: colors.root.green,
  },

  actionText: {
    fontSize: 12,
    fontWeight: "800",
    color: colors.root.secondary,
  },

  actionTextPrimary: {
    color: colors.root.primary,
  },

  pressed: {
    opacity: 0.7,
    transform: [{ scale: 0.98 }],
  },

  errorContainer: {
    flex: 1,
    backgroundColor: "#F8F9FA",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
  },

  errorTitle: {
    marginTop: 12,
    fontSize: 18,
    fontWeight: "900",
    color: colors.root.secondary,
  },

  errorDescription: {
    marginTop: 5,
    textAlign: "center",
    fontSize: 13,
    lineHeight: 19,
    color: "#777",
  },

  backButton: {
    marginTop: 20,
    height: 48,
    paddingHorizontal: 24,
    borderRadius: 14,
    backgroundColor: colors.root.secondary,
    alignItems: "center",
    justifyContent: "center",
  },

  backButtonText: {
    fontSize: 12,
    fontWeight: "800",
    color: colors.root.primary,
  },
});

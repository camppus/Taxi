import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import colors from "@/styles/color";
import { mockBookings } from "@/mocks/booking";
import { Booking, BookingStatus } from "@/types/Bookings";
import { useEffect, useState } from "react";
import { Loading } from "@/components/Loading";

const statusConfig: Record<
  BookingStatus,
  {
    label: string;
    icon: keyof typeof Ionicons.glyphMap;
  }
> = {
  PENDING: {
    label: "Pendente",
    icon: "time-outline",
  },
  PENDING_PAYMENT: {
    label: "Pagamento pendente",
    icon: "card-outline",
  },
  AWAITING_CONFIRMATION: {
    label: "Aguardando confirmação",
    icon: "hourglass-outline",
  },
  CONFIRMED: {
    label: "Confirmada",
    icon: "checkmark-circle-outline",
  },
  REJECTED: {
    label: "Rejeitada",
    icon: "close-circle-outline",
  },
  CANCELLED: {
    label: "Cancelada",
    icon: "close-circle-outline",
  },
  IN_TRIP: {
    label: "Em viagem",
    icon: "navigate-outline",
  },
  COMPLETED: {
    label: "Concluída",
    icon: "checkmark-done-circle-outline",
  },
};

const paymentStatus: Record<string, string> = {
  PENDING: "Pendente",
  PROCESSING: "A processar",
  PAID: "Pago",
  FAILED: "Falhou",
  CANCELLED: "Cancelado",
  REFUNDED: "Reembolsado",
};

export default function BookingDetails() {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);
  const { id } = useLocalSearchParams<{
    id: string;
  }>();

  const booking = mockBookings.find((item) => item.id === id);

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    console.log("Loading inicial:", loading);

    const timer = setTimeout(() => {
      console.log("Terminou loading");
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (!booking) {
    return (
      <View style={styles.center}>
        <Ionicons
          name="document-text-outline"
          size={50}
          color={colors.root.textTint}
        />
        <Text style={styles.notFoundTitle}>Reserva não encontrada</Text>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backButtonText}>Voltar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const status = statusConfig[booking.status];

  const pick = booking.tripStop[0];
  const drop = booking.tripStop[1];

  const departureDate = new Date(booking.trip.departureDate);

  const formattedDate = departureDate.toLocaleDateString("pt-AO", {
    weekday: "long",
    day: "2-digit",
    month: "long",
  });

  const formattedTime = departureDate.toLocaleTimeString("pt-AO", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <View style={styles.container}>
      {loading ? (
        <Loading />
      ) : (
        <>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.content}
          >
            {/* STATUS */}

            <View style={styles.statusCard}>
              <View style={styles.statusIcon}>
                <Ionicons
                  name={status.icon}
                  size={25}
                  color={colors.root.green}
                />
              </View>

              <View style={{ flex: 1 }}>
                <Text style={styles.statusTitle}>{status.label}</Text>

                <Text style={styles.bookingId}>
                  Reserva #{booking.id.slice(0, 8).toUpperCase()}
                </Text>
              </View>
            </View>

            {/* ROUTE */}

            <SectionTitle icon="navigate-outline" title="Percurso" />

            <View style={styles.routeCard}>
              {/* PICK */}

              <View style={styles.stopRow}>
                <View style={styles.timeline}>
                  <View style={styles.pickDot} />

                  <View style={styles.timelineLine} />
                </View>

                <View style={styles.stopContent}>
                  <Text style={styles.stopLabel}>PARTIDA</Text>

                  <Text style={styles.stopName}>{pick.location.name}</Text>

                  <Text style={styles.stopAddress}>
                    {pick.location.formattedAddress ||
                      `${pick.location.street}, ${pick.location.neighborhood}`}
                  </Text>
                </View>
              </View>

              {/* DROP */}

              <View style={styles.stopRow}>
                <View style={styles.timeline}>
                  <View style={styles.dropDot}>
                    <Ionicons name="location" size={10} color="#FFFFFF" />
                  </View>
                </View>

                <View style={styles.stopContent}>
                  <Text style={styles.stopLabel}>DESTINO</Text>

                  <Text style={styles.stopName}>{drop.location.name}</Text>

                  <Text style={styles.stopAddress}>
                    {drop.location.formattedAddress ||
                      `${drop.location.street}, ${drop.location.neighborhood}`}
                  </Text>
                </View>
              </View>
            </View>

            {/* TRIP INFO */}

            <SectionTitle
              icon="calendar-outline"
              title="Informações da viagem"
            />

            <View style={styles.infoCard}>
              <InfoRow
                icon="calendar-outline"
                label="Data"
                value={formattedDate}
              />

              <InfoRow
                icon="time-outline"
                label="Hora de partida"
                value={formattedTime}
              />

              <InfoRow
                icon="people-outline"
                label="Lugares reservados"
                value={`${booking.seats} ${
                  booking.seats === 1 ? "lugar" : "lugares"
                }`}
              />

              {booking.trip.distanceKm && (
                <InfoRow
                  icon="speedometer-outline"
                  label="Distância"
                  value={`${booking.trip.distanceKm.toFixed(1)} km`}
                />
              )}

              {booking.trip.estimatedMinutes && (
                <InfoRow
                  icon="hourglass-outline"
                  label="Duração estimada"
                  value={`${booking.trip.estimatedMinutes} min`}
                />
              )}

              <InfoRow
                icon="cash-outline"
                label="Preço da reserva"
                value={`${booking.price.toLocaleString("pt-AO")} Kz`}
                last
              />
            </View>

            {/* DRIVER */}

            <SectionTitle icon="person-outline" title="Motorista" />

            <View style={styles.driverCard}>
              <View style={styles.driverAvatar}>
                <Ionicons
                  name="person"
                  size={30}
                  color={colors.root.textTint}
                />
              </View>

              <View style={styles.driverMain}>
                <Text style={styles.driverName}>
                  {booking.trip.driver.user.fullName}
                </Text>

                <View style={styles.ratingRow}>
                  <Ionicons name="star" size={14} color="#F4B740" />

                  <Text style={styles.ratingText}>4.9</Text>

                  <Text style={styles.driverStatus}>
                    ·{" "}
                    {booking.trip.driver.status === "ONLINE"
                      ? "Online"
                      : "Motorista"}
                  </Text>
                </View>

                <Text style={styles.driverPhone}>
                  {booking.trip.driver.user.phone}
                </Text>
              </View>

              <TouchableOpacity style={styles.callButton}>
                <Ionicons
                  name="call-outline"
                  size={19}
                  color={colors.root.green}
                />
              </TouchableOpacity>
            </View>

            {/* VEHICLE */}

            <SectionTitle icon="car-outline" title="Veículo" />

            <View style={styles.vehicleCard}>
              <View style={styles.vehicleIcon}>
                <Ionicons
                  name="car-sport-outline"
                  size={30}
                  color={colors.root.secondary}
                />
              </View>

              <View style={styles.vehicleInfo}>
                <Text style={styles.vehicleName}>
                  {booking.trip.vehicle.brand} {booking.trip.vehicle.model}
                </Text>

                <Text style={styles.vehicleDescription}>
                  {booking.trip.vehicle.name}
                </Text>

                <View style={styles.vehicleMeta}>
                  <Text style={styles.vehicleMetaText}>
                    {booking.trip.vehicle.color}
                  </Text>

                  <View style={styles.dot} />

                  <Text style={styles.vehicleMetaText}>
                    {booking.trip.vehicle.year}
                  </Text>

                  <View style={styles.dot} />

                  <Text style={styles.vehicleMetaText}>
                    {booking.trip.vehicle.plateNumber}
                  </Text>
                </View>
              </View>
            </View>

            {/* PAYMENT */}

            <SectionTitle icon="card-outline" title="Pagamento" />

            <View style={styles.paymentCard}>
              <View style={styles.paymentTop}>
                <View style={styles.paymentIcon}>
                  <Ionicons
                    name="card-outline"
                    size={21}
                    color={colors.root.secondary}
                  />
                </View>

                <View style={{ flex: 1 }}>
                  <Text style={styles.paymentMethod}>
                    {booking.payment?.method || "Não informado"}
                  </Text>

                  <Text style={styles.paymentTransaction}>
                    {booking.payment?.transactionId
                      ? `ID: ${booking.payment.transactionId}`
                      : "Sem transação"}
                  </Text>
                </View>

                <View style={styles.paymentStatus}>
                  <Text style={styles.paymentStatusText}>
                    {paymentStatus[booking.payment?.status || "PENDING"]}
                  </Text>
                </View>
              </View>

              <View style={styles.paymentDivider} />

              <View style={styles.paymentTotal}>
                <Text style={styles.totalLabel}>Total</Text>

                <Text style={styles.totalValue}>
                  {booking.price.toLocaleString("pt-AO")} Kz
                </Text>
              </View>
            </View>

            {/* BOOKING META */}

            <View style={styles.bookingMeta}>
              <Text style={styles.metaTitle}>Informações da reserva</Text>

              <Text style={styles.metaText}>
                Criada em{" "}
                {new Date(booking.createdAt).toLocaleDateString("pt-AO")}
              </Text>

              <Text style={styles.metaText}>
                Atualizada em{" "}
                {new Date(booking.updatedAt).toLocaleDateString("pt-AO")}
              </Text>
            </View>

            <View style={{ height: 40 }} />

            <TouchableOpacity
              style={styles.headerButton}
              onPress={() => router.back()}
            >
              <Ionicons
                name="arrow-back"
                size={21}
                color={colors.root.secondary}
              />
              <Text>Voltar</Text>
            </TouchableOpacity>
          </ScrollView>
        </>
      )}
    </View>
  );
}

/* =========================
   COMPONENTS
========================= */

function SectionTitle({
  icon,
  title,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
}) {
  return (
    <View style={styles.sectionTitle}>
      <Ionicons name={icon} size={18} color={colors.root.green} />

      <Text style={styles.sectionTitleText}>{title}</Text>
    </View>
  );
}

function InfoRow({
  icon,
  label,
  value,
  last = false,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value: string;
  last?: boolean;
}) {
  return (
    <View style={[styles.infoRow, !last && styles.infoRowBorder]}>
      <View style={styles.infoIcon}>
        <Ionicons name={icon} size={17} color={colors.root.textTint} />
      </View>

      <Text style={styles.infoLabel}>{label}</Text>

      <Text style={styles.infoValue}>{value}</Text>
    </View>
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

  notFoundTitle: {
    marginTop: 15,
    fontSize: 18,
    fontWeight: "800",
    color: colors.root.secondary,
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

  header: {
    height: 72,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },

  headerButton: {
    width: "100%",
    height: 42,
    borderRadius: 13,
    backgroundColor: "#F4F5F5",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 3,
    marginBottom: 140,
    marginTop : -20
  },

  headerTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: colors.root.secondary,
  },

  content: {
    padding: 20,
  },

  statusCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 18,
    backgroundColor: "#F1FBF5",
    borderWidth: 1,
    borderColor: "#DDF3E5",
  },

  statusIcon: {
    width: 46,
    height: 46,
    borderRadius: 15,
    backgroundColor: "#E1F7E9",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  statusTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: colors.root.secondary,
  },

  bookingId: {
    marginTop: 4,
    fontSize: 11,
    color: colors.root.textTint,
  },

  sectionTitle: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    marginTop: 25,
    marginBottom: 10,
  },

  sectionTitleText: {
    fontSize: 15,
    fontWeight: "800",
    color: colors.root.secondary,
  },

  routeCard: {
    padding: 18,
    borderRadius: 18,
    backgroundColor: "#FAFAFA",
    borderWidth: 1,
    borderColor: "#EEEEEE",
  },

  stopRow: {
    flexDirection: "row",
  },

  timeline: {
    width: 25,
    alignItems: "center",
  },

  pickDot: {
    width: 13,
    height: 13,
    borderRadius: 7,
    backgroundColor: colors.root.secondary,
    borderWidth: 3,
    borderColor: "#D7DCE1",
  },

  dropDot: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: colors.root.green,
    alignItems: "center",
    justifyContent: "center",
  },

  timelineLine: {
    width: 1,
    height: 55,
    backgroundColor: "#D7D7D7",
  },

  stopContent: {
    flex: 1,
    marginLeft: 12,
    paddingBottom: 20,
  },

  stopLabel: {
    fontSize: 9,
    fontWeight: "900",
    letterSpacing: 0.8,
    color: colors.root.textTint,
  },

  stopName: {
    marginTop: 3,
    fontSize: 15,
    fontWeight: "800",
    color: colors.root.secondary,
  },

  stopAddress: {
    marginTop: 4,
    fontSize: 11,
    lineHeight: 16,
    color: colors.root.textTint,
  },

  infoCard: {
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: "#EEEEEE",
    borderRadius: 18,
    backgroundColor: colors.root.primary,
  },

  infoRow: {
    minHeight: 56,
    flexDirection: "row",
    alignItems: "center",
  },

  infoRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },

  infoIcon: {
    width: 32,
  },

  infoLabel: {
    flex: 1,
    fontSize: 12,
    color: colors.root.textTint,
  },

  infoValue: {
    maxWidth: "55%",
    fontSize: 12,
    fontWeight: "800",
    textAlign: "right",
    color: colors.root.secondary,
  },

  driverCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#EEEEEE",
  },

  driverAvatar: {
    width: 55,
    height: 55,
    borderRadius: 17,
    backgroundColor: "#F1F2F2",
    alignItems: "center",
    justifyContent: "center",
  },

  driverMain: {
    flex: 1,
    marginLeft: 12,
  },

  driverName: {
    fontSize: 14,
    fontWeight: "800",
    color: colors.root.secondary,
  },

  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
    gap: 4,
  },

  ratingText: {
    fontSize: 11,
    fontWeight: "800",
    color: colors.root.secondary,
  },

  driverStatus: {
    fontSize: 11,
    color: colors.root.textTint,
  },

  driverPhone: {
    marginTop: 4,
    fontSize: 11,
    color: colors.root.textTint,
  },

  callButton: {
    width: 42,
    height: 42,
    borderRadius: 13,
    backgroundColor: "#EAF9F0",
    alignItems: "center",
    justifyContent: "center",
  },

  vehicleCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#EEEEEE",
  },

  vehicleIcon: {
    width: 58,
    height: 58,
    borderRadius: 17,
    backgroundColor: "#F2F3F3",
    alignItems: "center",
    justifyContent: "center",
  },

  vehicleInfo: {
    flex: 1,
    marginLeft: 13,
  },

  vehicleName: {
    fontSize: 14,
    fontWeight: "800",
    color: colors.root.secondary,
  },

  vehicleDescription: {
    marginTop: 3,
    fontSize: 11,
    color: colors.root.textTint,
  },

  vehicleMeta: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    gap: 7,
  },

  vehicleMetaText: {
    fontSize: 10,
    fontWeight: "700",
    color: colors.root.textTint,
  },

  dot: {
    width: 3,
    height: 3,
    borderRadius: 2,
    backgroundColor: "#BDBDBD",
  },

  paymentCard: {
    padding: 16,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#EEEEEE",
  },

  paymentTop: {
    flexDirection: "row",
    alignItems: "center",
  },

  paymentIcon: {
    width: 43,
    height: 43,
    borderRadius: 13,
    backgroundColor: "#F2F3F3",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 11,
  },

  paymentMethod: {
    fontSize: 13,
    fontWeight: "800",
    color: colors.root.secondary,
  },

  paymentTransaction: {
    marginTop: 3,
    fontSize: 10,
    color: colors.root.textTint,
  },

  paymentStatus: {
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 8,
    backgroundColor: "#EAF9F0",
  },

  paymentStatusText: {
    fontSize: 9,
    fontWeight: "800",
    color: colors.root.green,
  },

  paymentDivider: {
    height: 1,
    backgroundColor: "#EEEEEE",
    marginVertical: 15,
  },

  paymentTotal: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  totalLabel: {
    fontSize: 12,
    color: colors.root.textTint,
  },

  totalValue: {
    fontSize: 17,
    fontWeight: "900",
    color: colors.root.secondary,
  },

  bookingMeta: {
    marginTop: 25,
    padding: 15,
    borderRadius: 16,
    backgroundColor: "#F7F7F7",
  },

  metaTitle: {
    fontSize: 12,
    fontWeight: "800",
    color: colors.root.secondary,
    marginBottom: 7,
  },

  metaText: {
    fontSize: 10,
    color: colors.root.textTint,
    marginTop: 3,
  },
});

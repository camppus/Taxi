import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  Alert,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { mockTrips } from "@/mocks/trip";
import color from "@/styles/color";
import { Booking } from "@/types/Bookings";

const paymentLabels: Record<string, string> = {
  PENDING: "Pagamento pendente",
  PROCESSING: "A processar",
  PAID: "Pago",
  FAILED: "Falhou",
  CANCELLED: "Cancelado",
  REFUNDED: "Reembolsado",
};

export default function DriverTripDetailsScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const trip = mockTrips.find((item) => item.id === id) ?? mockTrips[0];

  if (!trip) return null;
  const formattedPrice = trip.priceBase.toLocaleString("pt-AO");
  const bookings = trip.bookings as Booking[];
  const reservedSeats = bookings.reduce(
    (total, booking) => total + booking.seats,
    0,
  );
  const availableSeats = Math.max(
    (trip.publishedSeats ?? 0) - reservedSeats,
    0,
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Ionicons
            name="chevron-back"
            size={24}
            color={color.root.secondary}
          />
        </Pressable>
        <Text style={styles.headerTitle}>Detalhes da viagem</Text>
        <Pressable
          onPress={() =>
            Alert.alert(
              "Opções",
              "As opções de edição estarão disponíveis em breve.",
            )
          }
          style={styles.moreButton}
        >
          <Ionicons
            name="ellipsis-horizontal"
            size={22}
            color={color.root.secondary}
          />
        </Pressable>
      </View>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.statusRow}>
          <View style={styles.statusDot} />
          <Text style={styles.statusText}>PUBLICADA</Text>
        </View>
        <Text style={styles.route}>{trip.name}</Text>
        <Text style={styles.departure}>
          Partida em {trip.departureDate} às {trip.departureTime}
        </Text>

        <View style={styles.routeCard}>
          <View style={styles.timeline}>
            <View style={styles.originDot} />
            <View style={styles.line} />
            <View style={styles.destinationDot} />
          </View>
          <View style={styles.locationTexts}>
            <View>
              <Text style={styles.locationLabel}>PARTIDA</Text>
              <Text style={styles.locationText}>Origem da viagem</Text>
            </View>
            <View style={styles.locationEnd}>
              <Text style={styles.locationLabel}>DESTINO</Text>
              <Text style={styles.locationText}>Destino da viagem</Text>
            </View>
          </View>
        </View>

        <View style={styles.stats}>
          <View style={styles.stat}>
            <View style={styles.statIcon}>
              <Ionicons
                name="people-outline"
                size={19}
                color={color.root.green}
              />
            </View>
            <Text style={styles.statValue}>{availableSeats}</Text>
            <Text style={styles.statLabel}>lugares livres</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.stat}>
            <View style={styles.statIcon}>
              <Ionicons
                name="cash-outline"
                size={19}
                color={color.root.green}
              />
            </View>
            <Text style={styles.statValue}>{formattedPrice} Kz</Text>
            <Text style={styles.statLabel}>por passageiro</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Veículo</Text>
        <View style={styles.infoCard}>
          <View style={styles.carIcon}>
            <Ionicons
              name="car-sport-outline"
              size={25}
              color={color.root.green}
            />
          </View>
          <View style={styles.infoBody}>
            <Text style={styles.infoTitle}>
              {trip.vehicle.brand} {trip.vehicle.model}
            </Text>
            <Text style={styles.infoText}>
              {trip.vehicle.color} · {trip.vehicle.year}
            </Text>
          </View>
          <Text style={styles.plate}>{trip.vehicle.plateNumber}</Text>
        </View>

        <Text style={styles.sectionTitle}>Reservas</Text>
        {bookings.length > 0 ? (
          <>
            <Text style={styles.bookingSummary}>
              {bookings.length}{" "}
              {bookings.length === 1
                ? "reserva confirmada"
                : "reservas confirmadas"}{" "}
              · {reservedSeats}{" "}
              {reservedSeats === 1 ? "lugar ocupado" : "lugares ocupados"}
            </Text>
            <View style={styles.bookingList}>
              {bookings.map((booking) => (
                <BookingCard
                  key={booking.id}
                  booking={booking}
                  onPress={() =>
                    router.push(`/(driver)/bookings/${booking.id}`)
                  }
                />
              ))}
            </View>
          </>
        ) : (
          <View style={styles.emptyBooking}>
            <View style={styles.emptyIcon}>
              <Ionicons name="person-add-outline" size={25} color="#8E8E93" />
            </View>
            <Text style={styles.emptyTitle}>Ainda não há reservas</Text>
            <Text style={styles.emptyText}>
              Quando alguém reservar esta viagem, os dados aparecerão aqui.
            </Text>
          </View>
        )}
        <View style={styles.footer}>
          <Pressable
            style={styles.cancelButton}
            onPress={() =>
              Alert.alert(
                "Cancelar viagem",
                "Esta ação estará disponível quando a gestão de viagens estiver ligada à API.",
              )
            }
          >
            <Text style={styles.cancelText}>Cancelar viagem</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function BookingCard({
  booking,
  onPress,
}: {
  booking: Booking;
  onPress: () => void;
}) {
  const paymentStatus = booking.payment?.status ?? "PENDING";
  const isPaid = paymentStatus === "PAID";
  return (
    <View style={styles.bookingCard}>
      <View style={styles.bookingTop}>
        <View style={styles.passengerAvatar}>
          {booking.passenger.photoUrl ? (
            <Image
              source={{ uri: booking.passenger.photoUrl }}
              style={styles.passengerImage}
            />
          ) : (
            <Ionicons name="person" size={21} color={color.root.green} />
          )}
        </View>
        <View style={styles.passengerInfo}>
          <Text style={styles.passengerName}>{booking.passenger.fullName}</Text>
          <Text style={styles.passengerPhone}>{booking.passenger.phone}</Text>
        </View>
        <View style={styles.seatBadge}>
          <Ionicons name="people-outline" size={14} color="#2867B2" />
          <Text style={styles.seatText}>{booking.seats}</Text>
        </View>
      </View>
      <View style={styles.bookingDivider} />
      <View style={styles.paymentRow}>
        <View style={styles.paymentInfo}>
          <View
            style={[
              styles.paymentIcon,
              isPaid ? styles.paymentPaidIcon : styles.paymentPendingIcon,
            ]}
          >
            <Ionicons
              name={isPaid ? "checkmark-circle-outline" : "time-outline"}
              size={17}
              color={isPaid ? color.root.green : "#B7791F"}
            />
          </View>
          <View>
            <Text style={styles.paymentLabel}>Pagamento</Text>
            <Text
              style={[
                styles.paymentStatus,
                isPaid ? styles.paymentPaidText : styles.paymentPendingText,
              ]}
            >
              {paymentLabels[paymentStatus]}
            </Text>
          </View>
        </View>
        <Text style={styles.bookingPrice}>
          {booking.price.toLocaleString("pt-AO")} Kz
        </Text>
      </View>
      <Pressable style={styles.bookingButton} onPress={onPress}>
        <Text style={styles.bookingButtonText}>Ver reserva</Text>
        <Ionicons name="arrow-forward" size={16} color={color.root.secondary} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#fff" },
  header: {
    height: 64,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 13,
    backgroundColor: "#F5F5F5",
    alignItems: "center",
    justifyContent: "center",
  },
  moreButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: { color: color.root.secondary, fontSize: 16, fontWeight: "800" },
  content: { padding: 20, paddingTop: 12, paddingBottom: 24 },
  statusRow: { flexDirection: "row", alignItems: "center", gap: 6 },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: color.root.green,
  },
  statusText: {
    fontSize: 11,
    letterSpacing: 0.8,
    fontWeight: "800",
    color: "#47805A",
  },
  route: {
    fontSize: 25,
    fontWeight: "800",
    color: color.root.secondary,
    marginTop: 11,
  },
  departure: { fontSize: 13, color: "#737373", marginTop: 5 },
  routeCard: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#E9E9E9",
    borderRadius: 17,
    marginTop: 22,
    padding: 17,
  },
  timeline: { alignItems: "center", width: 22, paddingTop: 4 },
  originDot: {
    width: 11,
    height: 11,
    borderRadius: 6,
    borderWidth: 3,
    borderColor: color.root.green,
  },
  line: {
    height: 29,
    marginVertical: 5,
    borderLeftWidth: 1,
    borderStyle: "dashed",
    borderColor: "#C8C8C8",
  },
  destinationDot: {
    width: 11,
    height: 11,
    borderRadius: 2,
    backgroundColor: color.root.secondary,
  },
  locationTexts: { flex: 1, justifyContent: "space-between" },
  locationEnd: { marginTop: 20 },
  locationLabel: {
    fontSize: 10,
    fontWeight: "800",
    color: "#8E8E93",
    letterSpacing: 0.7,
  },
  locationText: {
    fontSize: 14,
    fontWeight: "700",
    color: color.root.secondary,
    marginTop: 4,
  },
  stats: {
    height: 111,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E9E9E9",
    borderRadius: 17,
    marginTop: 14,
  },
  stat: { flex: 1, alignItems: "center" },
  statDivider: { width: 1, height: 50, backgroundColor: "#E9E9E9" },
  statIcon: {
    width: 31,
    height: 31,
    borderRadius: 10,
    backgroundColor: "#EEF9F1",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 5,
  },
  statValue: { fontSize: 14, fontWeight: "800", color: color.root.secondary },
  statLabel: { color: "#8E8E93", fontSize: 10, marginTop: 2 },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: color.root.secondary,
    marginTop: 25,
    marginBottom: 10,
  },
  infoCard: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E9E9E9",
    padding: 13,
    borderRadius: 16,
  },
  carIcon: {
    width: 43,
    height: 43,
    borderRadius: 13,
    backgroundColor: "#EEF9F1",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 11,
  },
  infoBody: { flex: 1 },
  infoTitle: { color: color.root.secondary, fontSize: 14, fontWeight: "800" },
  infoText: { fontSize: 11, color: "#737373", marginTop: 3 },
  plate: {
    borderWidth: 1,
    borderColor: "#D8D8D8",
    paddingHorizontal: 7,
    paddingVertical: 5,
    borderRadius: 6,
    fontSize: 10,
    fontWeight: "800",
    color: color.root.secondary,
  },
  emptyBooking: {
    padding: 21,
    alignItems: "center",
    borderRadius: 17,
    backgroundColor: "#FAFAFA",
  },
  bookingSummary: {
    color: "#737373",
    fontSize: 12,
    marginTop: -5,
    marginBottom: 10,
  },
  bookingList: { gap: 9 },
  bookingCard: {
    borderWidth: 1,
    borderColor: "#E9E9E9",
    borderRadius: 17,
    padding: 13,
    backgroundColor: "#fff",
  },
  bookingTop: { flexDirection: "row", alignItems: "center" },
  passengerAvatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#EAF8F0",
    marginRight: 10,
  },
  passengerImage: { width: "100%", height: "100%" },
  passengerInfo: { flex: 1 },
  passengerName: {
    color: color.root.secondary,
    fontSize: 13,
    fontWeight: "800",
  },
  passengerPhone: { color: "#737373", fontSize: 11, marginTop: 3 },
  seatBadge: {
    minWidth: 34,
    height: 28,
    paddingHorizontal: 7,
    borderRadius: 9,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 3,
    backgroundColor: "#EEF4FF",
  },
  seatText: { color: "#2867B2", fontSize: 12, fontWeight: "800" },
  bookingDivider: { height: 1, backgroundColor: "#F0F0F0", marginVertical: 11 },
  paymentRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  paymentInfo: { flexDirection: "row", alignItems: "center", gap: 7 },
  paymentIcon: {
    width: 31,
    height: 31,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  paymentPaidIcon: { backgroundColor: "#EAF8F0" },
  paymentPendingIcon: { backgroundColor: "#FFF3CF" },
  paymentLabel: { color: "#737373", fontSize: 10 },
  paymentStatus: { fontSize: 11, fontWeight: "800", marginTop: 2 },
  paymentPaidText: { color: "#278653" },
  paymentPendingText: { color: "#A56800" },
  bookingPrice: {
    color: color.root.secondary,
    fontSize: 13,
    fontWeight: "800",
  },
  bookingButton: {
    height: 36,
    marginTop: 12,
    borderRadius: 11,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 5,
    backgroundColor: "#F3F3F3",
  },
  bookingButtonText: {
    color: color.root.secondary,
    fontSize: 11,
    fontWeight: "800",
  },
  emptyIcon: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: "#F0F0F0",
    alignItems: "center",
    justifyContent: "center",
  },
  emptyTitle: {
    fontSize: 14,
    fontWeight: "800",
    color: color.root.secondary,
    marginTop: 10,
  },
  emptyText: {
    textAlign: "center",
    color: "#737373",
    fontSize: 12,
    lineHeight: 17,
    marginTop: 4,
  },
  footer: {
    paddingTop: 12,
    paddingBottom: 15,
    marginBottom: 50,
  },
  cancelButton: {
    height: 51,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFF3F2",
  },
  cancelText: { color: "#C73B31", fontSize: 14, fontWeight: "800" },
});

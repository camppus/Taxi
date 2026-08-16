import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { BookingFooter } from "@/components/BookingFooter";
import RouteMap from "@/components/RouteMap";
import { mockBookings } from "@/mocks/booking";
import color from "@/styles/color";
import { BookingStatus } from "@/types/Bookings";
import { formatDate } from "@/util/date";
import { getInitials, handleCall } from "@/util/lib";

const labels: Record<BookingStatus, string> = {
  PENDING: "Aguardando decisão",
  PENDING_PAYMENT: "Aguardando decisão",
  AWAITING_CONFIRMATION: "Aguardando decisão",
  CONFIRMED: "Reserva confirmada",
  REJECTED: "Reserva recusada",
  CANCELLED: "Reserva cancelada",
  IN_TRIP: "Em viagem",
  COMPLETED: "Viagem concluída",
};

export default function DriverBookingDetailsScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const booking = mockBookings.find((item) => item.id === id);
  const [status, setStatus] = useState<BookingStatus>(
    booking?.status === "PENDING_PAYMENT"
      ? "AWAITING_CONFIRMATION"
      : (booking?.status ?? "PENDING"),
  );
  if (!booking)
    return (
      <SafeAreaView style={styles.notFound}>
        <Ionicons name="receipt-outline" size={45} color="#A1A1AA" />
        <Text style={styles.notFoundText}>Reserva não encontrada</Text>
        <Pressable onPress={() => router.back()}>
          <Text style={styles.backLink}>Voltar</Text>
        </Pressable>
      </SafeAreaView>
    );
  const pick = booking.tripStop[0].location;
  const drop = booking.tripStop[1].location;
  const pending =
    status === "PENDING" ||
    status === "AWAITING_CONFIRMATION" ||
    status === "PENDING_PAYMENT";
  const decide = (next: "CONFIRMED" | "REJECTED") =>
    Alert.alert(
      next === "CONFIRMED" ? "Aceitar reserva" : "Recusar reserva",
      next === "CONFIRMED"
        ? `Confirmar ${booking.seats} lugar(es) para ${booking.passenger.fullName}?`
        : "Esta reserva será recusada.",
      [
        { text: "Voltar", style: "cancel" },
        {
          text: next === "CONFIRMED" ? "Aceitar" : "Recusar",
          style: next === "REJECTED" ? "destructive" : "default",
          onPress: () => setStatus(next),
        },
      ],
    );
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.back}>
          <Ionicons
            name="chevron-back"
            size={24}
            color={color.root.secondary}
          />
        </Pressable>
        <Text style={styles.headerTitle}>Detalhes da reserva</Text>
        <View></View>
      </View>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={[
            styles.statusCard,
            pending
              ? styles.pendingCard
              : status === "CONFIRMED"
                ? styles.confirmedCard
                : styles.rejectedCard,
          ]}
        >
          <Ionicons
            name={
              pending
                ? "time-outline"
                : status === "CONFIRMED"
                  ? "checkmark-circle-outline"
                  : "close-circle-outline"
            }
            size={23}
            color={
              pending
                ? "#A56800"
                : status === "CONFIRMED"
                  ? "#278653"
                  : "#C73B31"
            }
          />
          <View>
            <Text style={styles.statusTitle}>{labels[status]}</Text>
            <Text style={styles.statusId}>
              Reserva #{booking.id.replace("booking-", "").padStart(4, "0")}
            </Text>
          </View>
        </View>
        <Text style={styles.sectionTitle}>Passageiro</Text>
        <View style={styles.passengerCard}>
          <View style={styles.photo}>
            {booking.passenger.photoUrl ? (
              <Image
                source={{ uri: booking.passenger.photoUrl }}
                style={styles.photoImage}
              />
            ) : (
              <Text style={styles.photoText}>
                {getInitials(booking.passenger.fullName)}
              </Text>
            )}
          </View>
          <View style={styles.passengerInfo}>
            <Text style={styles.passengerName}>
              {booking.passenger.fullName}
            </Text>
            <Text style={styles.passengerMeta}>{booking.passenger.phone}</Text>
            <Text style={styles.passengerMeta}>
              {booking.passenger.gender === "F" ? "Feminino" : "Masculino"}
            </Text>
          </View>
          <Pressable
            onPress={() => handleCall(booking.passenger.phone)}
            style={styles.call}
          >
            <Ionicons name="call-outline" size={19} color={color.root.green} />
          </Pressable>
        </View>
        <Text style={styles.sectionTitle}>Rota da reserva</Text>
        <View style={styles.routeCard}>
          <RoutePoint
            title="EMBARQUE"
            name={pick.name}
            address={pick.formattedAddress ?? pick.neighborhood}
            icon="ellipse"
          />
          <View style={styles.routeLine} />
          <RoutePoint
            title="DESEMBARQUE"
            name={drop.name}
            address={drop.formattedAddress ?? drop.neighborhood}
            icon="location"
          />
        </View>
        <RouteMap
          from={pick.name}
          to={drop.name}
          fromCoords={{ latitude: pick.latitude, longitude: pick.longitude }}
          toCoords={{ latitude: drop.latitude, longitude: drop.longitude }}
          routeCoords={[
            { latitude: pick.latitude, longitude: pick.longitude },
            { latitude: drop.latitude, longitude: drop.longitude },
          ]}
          title="Mapa do percurso"
          showBottomCard={false}
        />
        <Text style={styles.sectionTitle}>Informações</Text>
        <View style={styles.infoCard}>
          <Info
            icon="calendar-outline"
            label="Partida"
            value={formatDate(new Date(booking.trip.departureDate))}
          />
          <Info
            icon="people-outline"
            label="Lugares pedidos"
            value={`${booking.seats} ${booking.seats === 1 ? "lugar" : "lugares"}`}
          />
          <Info
            icon="speedometer-outline"
            label="Distância"
            value={`${booking.trip.distanceKm?.toFixed(1) ?? "—"} km`}
          />
          <Info
            icon="cash-outline"
            label="Total"
            value={`${booking.price.toLocaleString("pt-AO")} Kz`}
            last
          />
        </View>

        <View style={styles.footer}>
          {pending ? (
            <View style={styles.decisionRow}>
              <Pressable
                onPress={() => decide("REJECTED")}
                style={styles.reject}
              >
                <Ionicons name="close" size={19} color="#C73B31" />
                <Text style={styles.rejectText}>Recusar</Text>
              </Pressable>
              <Pressable
                onPress={() => decide("CONFIRMED")}
                style={styles.accept}
              >
                <Ionicons name="checkmark" size={19} color="#fff" />
                <Text style={styles.acceptText}>Aceitar reserva</Text>
              </Pressable>
            </View>
          ) : (
            <BookingFooter
              status={status}
              onBack={() => router.back()}
              onCall={() => handleCall(booking.passenger.phone)}
              onChat={() => router.push(`/(driver)/conversation/${booking.id}`)}
              onCancel={() =>
                Alert.alert(
                  "Cancelar",
                  "O cancelamento da reserva será disponibilizado em breve.",
                )
              }
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function RoutePoint({
  title,
  name,
  address,
  icon,
}: {
  title: string;
  name: string;
  address: string;
  icon: keyof typeof Ionicons.glyphMap;
}) {
  return (
    <View style={styles.point}>
      <View style={styles.pointIcon}>
        <Ionicons
          name={icon}
          size={icon === "location" ? 17 : 13}
          color={icon === "location" ? color.root.secondary : color.root.green}
        />
      </View>
      <View>
        <Text style={styles.pointLabel}>{title}</Text>
        <Text style={styles.pointName}>{name}</Text>
        <Text style={styles.pointAddress}>{address}</Text>
      </View>
    </View>
  );
}
function Info({
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
    <View style={[styles.info, !last && styles.infoBorder]}>
      <Ionicons name={icon} size={17} color="#737373" />
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#fff" },
  notFound: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  notFoundText: {
    marginTop: 11,
    color: color.root.secondary,
    fontSize: 16,
    fontWeight: "800",
  },
  backLink: { color: color.root.green, fontWeight: "800", marginTop: 14 },
  header: {
    height: 64,
    paddingHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#F0F0F0",
  },
  back: {
    width: 40,
    height: 40,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F5F5F5",
  },
  headerTitle: { fontSize: 16, fontWeight: "800", color: color.root.secondary },
  content: { padding: 16, paddingBottom: 15 },
  statusCard: {
    borderRadius: 17,
    padding: 14,
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  pendingCard: { backgroundColor: "#FFF8E5" },
  confirmedCard: { backgroundColor: "#EAF8F0" },
  rejectedCard: { backgroundColor: "#FFF0F0" },
  statusTitle: { fontSize: 14, color: color.root.secondary, fontWeight: "800" },
  statusId: { color: "#737373", fontSize: 11, marginTop: 3 },
  sectionTitle: {
    marginTop: 22,
    marginBottom: 9,
    fontSize: 16,
    color: color.root.secondary,
    fontWeight: "800",
  },
  passengerCard: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#EAEAEA",
    borderRadius: 17,
    padding: 13,
  },
  photo: {
    width: 47,
    height: 47,
    borderRadius: 24,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#EAF8F0",
    marginRight: 11,
  },
  photoImage: { width: "100%", height: "100%" },
  photoText: { color: "#278653", fontWeight: "800" },
  passengerInfo: { flex: 1 },
  passengerName: {
    fontSize: 14,
    fontWeight: "800",
    color: color.root.secondary,
  },
  passengerMeta: { fontSize: 11, color: "#737373", marginTop: 2 },
  call: {
    width: 38,
    height: 38,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#EAF8F0",
  },
  routeCard: {
    borderWidth: 1,
    borderColor: "#EAEAEA",
    borderRadius: 17,
    padding: 15,
    marginBottom: 10,
  },
  point: { flexDirection: "row", gap: 10, alignItems: "flex-start" },
  pointIcon: { width: 20, alignItems: "center", paddingTop: 3 },
  routeLine: {
    height: 25,
    borderLeftWidth: 1,
    borderStyle: "dashed",
    borderColor: "#CECECE",
    marginLeft: 9,
    marginVertical: 2,
  },
  pointLabel: {
    color: "#8E8E93",
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 0.6,
  },
  pointName: {
    color: color.root.secondary,
    fontSize: 14,
    fontWeight: "800",
    marginTop: 3,
  },
  pointAddress: { color: "#737373", fontSize: 11, marginTop: 2 },
  infoCard: {
    borderWidth: 1,
    borderColor: "#EAEAEA",
    borderRadius: 17,
    paddingHorizontal: 14,
  },
  info: { minHeight: 49, flexDirection: "row", alignItems: "center", gap: 9 },
  infoBorder: { borderBottomWidth: 1, borderColor: "#F0F0F0" },
  infoLabel: { flex: 1, color: "#737373", fontSize: 12 },
  infoValue: {
    color: color.root.secondary,
    fontSize: 12,
    fontWeight: "700",
    maxWidth: "58%",
    textAlign: "right",
  },
  tripCard: {
    borderWidth: 1,
    borderColor: "#EAEAEA",
    borderRadius: 17,
    padding: 13,
    flexDirection: "row",
    alignItems: "center",
  },
  tripIcon: {
    width: 41,
    height: 41,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#EAF8F0",
    marginRight: 10,
  },
  tripName: { color: color.root.secondary, fontSize: 14, fontWeight: "800" },
  tripMeta: { color: "#737373", fontSize: 11, marginTop: 4 },
  footer: {
    paddingTop: 4,
    paddingBottom: 14,
    marginBottom: 70,
  },
  decisionRow: { flexDirection: "row", gap: 9, paddingTop: 8 },
  reject: {
    flex: 0.82,
    height: 51,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 5,
    backgroundColor: "#FFF0F0",
  },
  rejectText: { color: "#C73B31", fontSize: 14, fontWeight: "800" },
  accept: {
    flex: 1.3,
    height: 51,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 6,
    backgroundColor: color.root.green,
  },
  acceptText: { color: "#fff", fontSize: 14, fontWeight: "800" },
});

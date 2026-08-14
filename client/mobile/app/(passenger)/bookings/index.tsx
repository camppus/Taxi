import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";

import colors from "@/styles/color";
import { Booking, BookingStatus } from "@/types/Bookings";
import { mockBookings } from "@/mocks/booking";
import { useEffect, useState } from "react";
import { Loading } from "@/components/Loading";

const statusConfig: Record<
  BookingStatus,
  {
    label: string;
    icon: keyof typeof Ionicons.glyphMap;
    color: string;
    background: string;
  }
> = {
  PENDING: {
    label: "Pendente",
    icon: "time-outline",
    color: "#B7791F",
    background: "#FFF7E6",
  },

  PENDING_PAYMENT: {
    label: "Pagamento pendente",
    icon: "card-outline",
    color: "#B7791F",
    background: "#FFF7E6",
  },

  AWAITING_CONFIRMATION: {
    label: "Aguardando confirmação",
    icon: "hourglass-outline",
    color: "#6B5DD3",
    background: "#F1EEFF",
  },

  CONFIRMED: {
    label: "Confirmada",
    icon: "checkmark-circle-outline",
    color: colors.root.green,
    background: "#EAF9F0",
  },

  REJECTED: {
    label: "Rejeitada",
    icon: "close-circle-outline",
    color: "#D14343",
    background: "#FFF0F0",
  },

  CANCELLED: {
    label: "Cancelada",
    icon: "ban-outline",
    color: "#FFF0F0",
    background: "#D14343",
  },

  IN_TRIP: {
    label: "Em viagem",
    icon: "car-outline",
    color: "#2563EB",
    background: "#EEF4FF",
  },

  COMPLETED: {
    label: "Concluída",
    icon: "checkmark-done-circle-outline",
    color: "#16865A",
    background: "#EAF9F0",
  },
};

function BookingCard({
  booking,
  onPress,
}: {
  booking: Booking;
  onPress: () => void;
}) {
  const status = statusConfig[booking.status];

  const pick = booking.tripStop[0];
  const drop = booking.tripStop[1];

  const departureDate = new Date(booking.trip.departureDate);

  const date = departureDate.toLocaleDateString("pt-AO", {
    day: "2-digit",
    month: "short",
  });

  const time = departureDate.toLocaleTimeString("pt-AO", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <Pressable
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
      onPress={onPress}
    >
      {/* HEADER */}

      <View style={styles.cardHeader}>
        <View style={styles.dateContainer}>
          <View style={styles.calendarIcon}>
            <Ionicons
              name="calendar-outline"
              size={18}
              color={colors.root.secondary}
            />
          </View>

          <View>
            <Text style={styles.date}>{date}</Text>
            <Text style={styles.time}>{time}</Text>
          </View>
        </View>

        <View
          style={[
            styles.statusBadge,
            {
              backgroundColor: status.background,
            },
          ]}
        >
          <Ionicons name={status.icon} size={13} color={status.color} />

          <Text
            style={[
              styles.statusText,
              {
                color: status.color,
              },
            ]}
          >
            {status.label}
          </Text>
        </View>
      </View>

      {/* ROUTE */}

      <View style={styles.routeContainer}>
        <View style={styles.timeline}>
          <View style={styles.pickDot} />

          <View style={styles.timelineLine} />

          <View style={styles.dropDot} />
        </View>

        <View style={styles.routeInfo}>
          <View>
            <Text style={styles.routeLabel}>PARTIDA</Text>

            <Text style={styles.locationName} numberOfLines={1}>
              {pick.location.name}
            </Text>

            <Text style={styles.locationAddress} numberOfLines={1}>
              {pick.location.neighborhood}
            </Text>
          </View>

          <View style={styles.destination}>
            <Text style={styles.routeLabel}>DESTINO</Text>

            <Text style={styles.locationName} numberOfLines={1}>
              {drop.location.name}
            </Text>

            <Text style={styles.locationAddress} numberOfLines={1}>
              {drop.location.neighborhood}
            </Text>
          </View>
        </View>
      </View>

      {/* DRIVER */}

      <View style={styles.driverContainer}>
        <View style={styles.driverAvatar}>
          <Ionicons name="person" size={18} color={colors.root.textTint} />
        </View>

        <View style={styles.driverInfo}>
          <Text style={styles.driverName}>
            {booking.trip.driver.fullName}
          </Text>

          <Text style={styles.vehicle}>
            {booking.trip.vehicle.brand} {booking.trip.vehicle.model} ·{" "}
            {booking.trip.vehicle.color}
          </Text>
        </View>

        <View style={styles.seats}>
          <Ionicons
            name="people-outline"
            size={15}
            color={colors.root.textTint}
          />

          <Text style={styles.seatsText}>
            {booking.seats} {booking.seats === 1 ? "lugar" : "lugares"}
          </Text>
        </View>
      </View>

      {/* FOOTER */}

      <View style={styles.cardFooter}>
        <View>
          <Text style={styles.priceLabel}>Total</Text>

          <Text style={styles.price}>
            {booking.price.toLocaleString("pt-AO")} Kz
          </Text>
        </View>

        <View style={styles.detailsButton}>
          <Text style={styles.detailsText}>Ver detalhes</Text>

          <Ionicons
            name="chevron-forward"
            size={17}
            color={colors.root.secondary}
          />
        </View>
      </View>
    </Pressable>
  );
}

export default function BookingsPage() {
  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <Loading />
      ) : (
        <>
          <View style={styles.header}>
            <View>
              <Text style={styles.title}>Minhas viagens</Text>

              <Text style={styles.subtitle}>
                Consulte e acompanhe as suas reservas
              </Text>
            </View>

            <View style={styles.countBadge}>
              <Text style={styles.countText}>{mockBookings.length}</Text>
            </View>
          </View>
          <FlatList
            data={mockBookings}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.list}
            renderItem={({ item }) => (
              <BookingCard
                booking={item}
                onPress={() =>
                  router.push({
                    pathname: "/(passenger)/bookings/[id]",
                    params: {
                      id: item.id,
                    },
                  })
                }
              />
            )}
            ListEmptyComponent={
              <View style={styles.empty}>
                <View style={styles.emptyIcon}>
                  <Ionicons
                    name="calendar-outline"
                    size={30}
                    color={colors.root.textTint}
                  />
                </View>

                <Text style={styles.emptyTitle}>Ainda não tem viagens</Text>

                <Text style={styles.emptyText}>
                  Quando fizer uma reserva, ela aparecerá aqui.
                </Text>
              </View>
            }
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.root.primary,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 18,
  },

  title: {
    fontSize: 22,
    fontWeight: "900",
    color: colors.root.secondary,
  },

  subtitle: {
    marginTop: 4,
    fontSize: 12,
    color: colors.root.textTint,
  },

  countBadge: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: "#F0F2F2",
    alignItems: "center",
    justifyContent: "center",
  },

  countText: {
    fontSize: 13,
    fontWeight: "900",
    color: colors.root.secondary,
  },

  list: {
    paddingHorizontal: 20,
    paddingBottom: 130,
    gap: 12,
  },

  card: {
    backgroundColor: colors.root.primary,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 20,
    padding: 15,

    elevation: 2,

    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },

  cardPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.99 }],
  },

  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  calendarIcon: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: "#F2F3F3",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 9,
  },

  date: {
    fontSize: 13,
    fontWeight: "900",
    color: colors.root.secondary,
    textTransform: "capitalize",
  },

  time: {
    marginTop: 2,
    fontSize: 11,
    color: colors.root.textTint,
  },

  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 9,
  },

  statusText: {
    fontSize: 9,
    fontWeight: "800",
  },

  routeContainer: {
    flexDirection: "row",
    marginTop: 18,
  },

  timeline: {
    width: 20,
    alignItems: "center",
    paddingTop: 4,
  },

  pickDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.root.secondary,
    borderWidth: 2,
    borderColor: "#D7DBDF",
  },

  timelineLine: {
    width: 1,
    height: 40,
    backgroundColor: "#D8D8D8",
  },

  dropDot: {
    width: 11,
    height: 11,
    borderRadius: 6,
    backgroundColor: colors.root.green,
  },

  routeInfo: {
    flex: 1,
    marginLeft: 9,
  },

  routeLabel: {
    fontSize: 8,
    fontWeight: "900",
    letterSpacing: 0.8,
    color: colors.root.textTint,
    marginBottom: 3,
  },

  locationName: {
    fontSize: 13,
    fontWeight: "800",
    color: colors.root.secondary,
  },

  locationAddress: {
    marginTop: 2,
    fontSize: 10,
    color: colors.root.textTint,
  },

  destination: {
    marginTop: 17,
  },

  driverContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 17,
    paddingTop: 13,
    borderTopWidth: 1,
    borderTopColor: "#F0F0F0",
  },

  driverAvatar: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: "#F0F1F1",
    alignItems: "center",
    justifyContent: "center",
  },

  driverInfo: {
    flex: 1,
    marginLeft: 9,
  },

  driverName: {
    fontSize: 12,
    fontWeight: "800",
    color: colors.root.secondary,
  },

  vehicle: {
    marginTop: 2,
    fontSize: 10,
    color: colors.root.textTint,
  },

  seats: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },

  seatsText: {
    fontSize: 10,
    fontWeight: "700",
    color: colors.root.textTint,
  },

  cardFooter: {
    marginTop: 14,
    paddingTop: 13,
    borderTopWidth: 1,
    borderTopColor: "#F0F0F0",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  priceLabel: {
    fontSize: 9,
    color: colors.root.textTint,
  },

  price: {
    marginTop: 2,
    fontSize: 15,
    fontWeight: "900",
    color: colors.root.secondary,
  },

  detailsButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },

  detailsText: {
    fontSize: 11,
    fontWeight: "800",
    color: colors.root.secondary,
  },

  empty: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
    paddingTop: 100,
  },

  emptyIcon: {
    width: 65,
    height: 65,
    borderRadius: 20,
    backgroundColor: "#F1F2F2",
    alignItems: "center",
    justifyContent: "center",
  },

  emptyTitle: {
    marginTop: 15,
    fontSize: 16,
    fontWeight: "900",
    color: colors.root.secondary,
  },

  emptyText: {
    marginTop: 6,
    fontSize: 12,
    lineHeight: 18,
    textAlign: "center",
    color: colors.root.textTint,
  },
});

import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useMemo, useState } from "react";
import {
  Alert,
  Image,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { mockTrips } from "@/mocks/trip";
import colors from "@/styles/color";
import RouteMap from "@/components/RouteMap";
import { Coordinate } from "@/types/Coord";

type PaymentMethod = "cash" | "multicaixa" | "wallet";

export default function ReservePage() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();

  const trip = useMemo(() => mockTrips.find((item) => item.id === id), [id]);

  const [pickup, setPickup] = useState({
    latitude: trip?.originLat ?? -8.8383,
    longitude: trip?.originLog ?? 13.2344,
  });

  const [dropoff, setDropoff] = useState({
    latitude: trip?.destinationLat ?? -8.9172,
    longitude: trip?.destinationLog ?? 13.1847,
  });

  const [seats, setSeats] = useState(1);

  const [paymentMethod, setPaymentMethod] =
    useState<PaymentMethod>("multicaixa");

  const [date, setDate] = useState(
    trip ? new Date(`${trip.departureDate}T${trip.departureTime}`) : new Date(),
  );

  const [showDatePicker, setShowDatePicker] = useState(false);

  const [selectingDropoff, setSelectingDropoff] = useState(false);

  if (!trip) {
    return (
      <View style={styles.errorContainer}>
        <Ionicons name="alert-circle-outline" size={48} color="#D14343" />

        <Text style={styles.errorTitle}>Viagem não encontrada</Text>

        <Text style={styles.errorDescription}>
          Não foi possível encontrar a viagem selecionada.
        </Text>

        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backButtonText}>Voltar</Text>
        </Pressable>
      </View>
    );
  }

  const total = trip.priceBase * seats;

  function handleReserve() {
    Alert.alert(
      "Confirmar reserva",
      `Reservar ${seats} ${seats === 1 ? "lugar" : "lugares"} por ${formatKz(total)}?`,
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Confirmar",
          onPress: () => {
            router.push({
              pathname: "/(passenger)/bookings/sucess",
              params: {
                tripId: trip?.id,
              },
            });
          },
        },
      ],
    );
  }

  const routeCoords = useMemo<Coordinate[]>(() => {
    const points = 10;

    return Array.from({ length: points }, (_, index) => {
      const progress = index / (points - 1);

      return {
        latitude:
          pickup.latitude + (dropoff.latitude - pickup.latitude) * progress,

        longitude:
          pickup.longitude + (dropoff.longitude - pickup.longitude) * progress,
      };
    });
  }, [pickup, dropoff]);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.content}
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

        <Text style={styles.headerTitle}>Reservar viagem</Text>

        <View style={{ width: 42 }} />
      </View>
      {/* TRIP */}
      <View style={styles.tripCard}>
        <View style={styles.tripTop}>
          <View style={styles.tripRoute}>
            <View style={styles.routeDotGreen} />

            <View style={styles.routeLine} />

            <View style={styles.routeDotDark} />
          </View>

          <View style={styles.routeInfo}>
            <Text style={styles.routeOrigin}>Origem</Text>

            <Text style={styles.routeDestination}>Destino</Text>
          </View>

          <View style={styles.tripNameContainer}>
            <Text style={styles.tripName}>{trip.name}</Text>

            <Text style={styles.tripSchedule}>
              {trip.departureDate} · {trip.departureTime}
            </Text>
          </View>
        </View>

        <View style={styles.tripPrice}>
          <Text style={styles.fromText}>a partir de</Text>

          <Text style={styles.price}>{formatKz(trip.priceBase)}</Text>
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Motorista</Text>

        <Pressable
          onPress={() => {
            router.push({
              pathname: "/(passenger)/driver-profile",
              params: {
                id: trip.driver.id,
              },
            });
          }}
          style={({ pressed }) => [
            styles.driverCard,
            pressed && {
              backgroundColor: "#e8ebe9",
            },
          ]}
        >
          <Image
            source={{ uri: trip.driver.photoUrl }}
            style={styles.driverAvatar}
          />

          <View style={styles.driverInfo}>
            <Text style={styles.driverName}>{trip.driver.fullName}</Text>

            <View style={styles.driverMeta}>
              <Ionicons
                name="shield-checkmark"
                size={14}
                color={colors.root.green}
              />

              <Text style={styles.driverVerified}>Motorista verificado</Text>
            </View>
          </View>

          <View style={styles.rating}>
            <Ionicons name="star" size={15} color="#F59E0B" />

            <Text style={styles.ratingText}>4.9</Text>
          </View>
        </Pressable>
      </View>
      {/* VEHICLE */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Veículo</Text>

        <View style={styles.vehicleCard}>
          <Image
            source={{ uri: trip.vehicle.image }}
            style={styles.vehicleImage}
          />

          <View style={styles.vehicleInfo}>
            <Text style={styles.vehicleName}>
              {trip.vehicle.brand} {trip.vehicle.model}
            </Text>

            <Text style={styles.vehicleDescription}>
              {trip.vehicle.description}
            </Text>

            <View style={styles.vehicleMeta}>
              <View style={styles.metaItem}>
                <Ionicons name="car-outline" size={15} color="#777" />
                <Text style={styles.metaText}>{trip.vehicle.color}</Text>
              </View>

              <View style={styles.metaItem}>
                <Ionicons name="people-outline" size={15} color="#777" />
                <Text style={styles.metaText}>
                  {trip.publishedSeats} lugares
                </Text>
              </View>

              <View style={styles.metaItem}>
                <Ionicons name="card-outline" size={15} color="#777" />
                <Text style={styles.metaText}>{trip.vehicle.plateNumber}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
      {/* STOPS */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Pontos da viagem</Text>

          {selectingDropoff && (
            <Text style={styles.mapHint}>Toque no mapa para escolher</Text>
          )}
        </View>

        <View style={styles.stopCard}>
          <View style={styles.stopIconColumn}>
            <View style={styles.stopDotStart} />
            <View style={styles.stopConnector} />
            <View style={styles.stopDotEnd} />
          </View>

          <View style={styles.stopContent}>
            <View style={styles.stopRow}>
              <View style={styles.stopTextContainer}>
                <Text style={styles.stopLabel}>Embarque</Text>

                <Text style={styles.stopValue}>{trip.name.split(" ")[0]}</Text>
              </View>

              <Ionicons name="location" size={20} color={colors.root.green} />
            </View>

            <View style={styles.stopSeparator} />

            <View style={styles.stopRow}>
              <View style={styles.stopTextContainer}>
                <Text style={styles.stopLabel}>Desembarque</Text>

                <Text style={styles.stopValue}>{trip.name.split(" ")[2]}</Text>
              </View>

              <Pressable
                onPress={() => setSelectingDropoff((current) => !current)}
                style={styles.changeButton}
              >
                <Text style={styles.changeButtonText}>
                  {selectingDropoff ? "Concluir" : "Mapa"}
                </Text>
              </Pressable>
            </View>
          </View>
        </View>

        <View style={styles.mapContainer}>
          <RouteMap
            from="Ponto de embarque"
            to="Ponto de desembarque"
            fromCoords={pickup}
            toCoords={dropoff}
            routeCoords={routeCoords}
            title="Rota da viagem"
            subtitle={`${trip.name} · ${trip.departureTime}`}
          />
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Agendamento</Text>

        <Pressable
          onPress={() => setShowDatePicker(true)}
          style={({ pressed }) => [styles.dateCard, pressed && styles.pressed]}
        >
          <View style={styles.dateIcon}>
            <Ionicons
              name="calendar-outline"
              size={20}
              color={colors.root.green}
            />
          </View>

          <View style={styles.dateContent}>
            <Text style={styles.dateLabel}>Data e hora</Text>

            <Text style={styles.dateValue}>{formatDate(date)}</Text>
          </View>

          <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
        </Pressable>

        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="datetime"
            display={Platform.OS === "ios" ? "spinner" : "default"}
            minimumDate={new Date()}
            onChange={(_, selectedDate) => {
              setShowDatePicker(false);

              if (selectedDate) {
                setDate(selectedDate);
              }
            }}
          />
        )}
      </View>
      {/* SEATS */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Lugares</Text>

        <View style={styles.seatCard}>
          <View>
            <Text style={styles.seatTitle}>Quantas pessoas?</Text>

            <Text style={styles.seatDescription}>
              {trip.publishedSeats} lugares disponíveis
            </Text>
          </View>

          <View style={styles.counter}>
            <Pressable
              onPress={() => setSeats((current) => Math.max(1, current - 1))}
              style={styles.counterButton}
            >
              <Ionicons name="remove" size={18} color={colors.root.secondary} />
            </Pressable>

            <Text style={styles.counterValue}>{seats}</Text>

            <Pressable
              onPress={() =>
                setSeats((current) =>
                  Math.min(trip.publishedSeats ?? 1, current + 1),
                )
              }
              style={styles.counterButton}
            >
              <Ionicons name="add" size={18} color={colors.root.secondary} />
            </Pressable>
          </View>
        </View>
      </View>
      {/* PAYMENT */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Forma de pagamento</Text>

        <View style={styles.paymentList}>
          <PaymentOption
            icon="phone-portrait-outline"
            title="Multicaixa Express"
            description="Pagar através do Multicaixa Express"
            selected={paymentMethod === "multicaixa"}
            onPress={() => setPaymentMethod("multicaixa")}
          />

          <PaymentOption
            icon="wallet-outline"
            title="Carteira MandaVir"
            description="Usar saldo da tua carteira"
            selected={paymentMethod === "wallet"}
            onPress={() => setPaymentMethod("wallet")}
          />

          <PaymentOption
            icon="cash-outline"
            title="Dinheiro"
            description="Pagar diretamente ao motorista"
            selected={paymentMethod === "cash"}
            onPress={() => setPaymentMethod("cash")}
          />
        </View>
      </View>
      <View style={styles.summaryCard}>
        <Text style={styles.summaryTitle}>Resumo da reserva</Text>

        <SummaryRow label="Viagem" value={trip.name} />

        <SummaryRow label="Preço por lugar" value={formatKz(trip.priceBase)} />

        <SummaryRow label="Lugares" value={`${seats}`} />

        <View style={styles.summarySeparator} />

        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total</Text>

          <Text style={styles.totalValue}>{formatKz(total)}</Text>
        </View>
      </View>
      <View style={styles.bottomBar}>
        <View style={styles.bottomPrice}>
          <Text style={styles.bottomPriceLabel}>Total</Text>

          <Text style={styles.bottomPriceValue}>{formatKz(total)}</Text>
        </View>

        <Pressable
          onPress={handleReserve}
          style={({ pressed }) => [
            styles.reserveButton,
            pressed && styles.pressed,
          ]}
        >
          <Text style={styles.reserveButtonText}>Confirmar reserva</Text>

          <Ionicons
            name="arrow-forward"
            size={19}
            color={colors.root.primary}
          />
        </Pressable>
      </View>
    </ScrollView>
  );
}

function PaymentOption({
  icon,
  title,
  description,
  selected,
  onPress,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  description: string;
  selected: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.paymentOption, selected && styles.paymentOptionSelected]}
    >
      <View
        style={[styles.paymentIcon, selected && styles.paymentIconSelected]}
      >
        <Ionicons
          name={icon}
          size={20}
          color={selected ? colors.root.primary : colors.root.secondary}
        />
      </View>

      <View style={styles.paymentContent}>
        <Text style={styles.paymentTitle}>{title}</Text>

        <Text style={styles.paymentDescription}>{description}</Text>
      </View>

      <View style={[styles.radio, selected && styles.radioSelected]}>
        {selected && <View style={styles.radioInner} />}
      </View>
    </Pressable>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.summaryRow}>
      <Text style={styles.summaryLabel}>{label}</Text>

      <Text style={styles.summaryValue}>{value}</Text>
    </View>
  );
}

function formatKz(value: number) {
  return `${value.toLocaleString("pt-AO")} Kz`;
}

function formatDate(date: Date) {
  return date.toLocaleString("pt-AO", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 16,
    paddingTop: 18,
    paddingBottom: 130,
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

  tripCard: {
    backgroundColor: colors.root.secondary,
    borderRadius: 20,
    padding: 18,
    marginBottom: 24,
  },

  tripTop: {
    flexDirection: "row",
  },

  tripRoute: {
    width: 18,
    alignItems: "center",
    paddingTop: 3,
  },

  routeDotGreen: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.root.green,
  },

  routeDotDark: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#FFFFFF",
  },

  routeLine: {
    width: 2,
    flex: 1,
    minHeight: 26,
    marginVertical: 3,
    backgroundColor: "rgba(255,255,255,0.3)",
  },

  routeInfo: {
    width: 55,
    justifyContent: "space-between",
    paddingVertical: 0,
  },

  routeOrigin: {
    fontSize: 10,
    color: "rgba(255,255,255,0.6)",
  },

  routeDestination: {
    fontSize: 10,
    color: "rgba(255,255,255,0.6)",
    marginTop: 17,
  },

  tripNameContainer: {
    flex: 1,
    marginLeft: 10,
  },

  tripName: {
    fontSize: 17,
    fontWeight: "800",
    color: colors.root.primary,
  },

  tripSchedule: {
    marginTop: 6,
    fontSize: 12,
    color: "rgba(255,255,255,0.65)",
  },

  tripPrice: {
    marginTop: 18,
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.1)",
  },

  fromText: {
    fontSize: 10,
    color: "rgba(255,255,255,0.55)",
  },

  price: {
    marginTop: 2,
    fontSize: 22,
    fontWeight: "900",
    color: colors.root.primary,
  },

  section: {
    marginBottom: 24,
  },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  sectionTitle: {
    fontSize: 14,
    fontWeight: "800",
    color: colors.root.secondary,
    marginBottom: 10,
  },

  mapHint: {
    fontSize: 10,
    fontWeight: "700",
    color: colors.root.green,
  },

  driverCard: {
    backgroundColor: colors.root.primary,
    borderRadius: 18,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#F9F5F9",
  },

  driverAvatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
  },

  driverInfo: {
    flex: 1,
    marginLeft: 12,
  },

  driverName: {
    fontSize: 14,
    fontWeight: "800",
    color: colors.root.secondary,
  },

  driverMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 5,
  },

  driverVerified: {
    fontSize: 10,
    fontWeight: "700",
    color: colors.root.green,
  },

  rating: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },

  ratingText: {
    fontSize: 12,
    fontWeight: "800",
    color: colors.root.secondary,
  },

  vehicleCard: {
    backgroundColor: colors.root.primary,
    borderRadius: 18,
    padding: 12,
    flexDirection: "row",
  },

  vehicleImage: {
    width: 110,
    height: 80,
    borderRadius: 13,
    backgroundColor: "#EFEFEF",
  },

  vehicleInfo: {
    flex: 1,
    marginLeft: 12,
  },

  vehicleName: {
    fontSize: 14,
    fontWeight: "800",
    color: colors.root.secondary,
  },

  vehicleDescription: {
    marginTop: 4,
    fontSize: 11,
    color: "#888",
  },

  vehicleMeta: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 10,
  },

  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },

  metaText: {
    fontSize: 10,
    color: "#777",
    fontWeight: "600",
  },

  stopCard: {
    backgroundColor: colors.root.primary,
    borderRadius: 18,
    padding: 15,
    flexDirection: "row",
  },

  stopIconColumn: {
    width: 18,
    alignItems: "center",
    paddingTop: 4,
  },

  stopDotStart: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.root.green,
  },

  stopConnector: {
    width: 2,
    height: 34,
    marginVertical: 3,
    backgroundColor: "#D9DDE0",
  },

  stopDotEnd: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.root.secondary,
  },

  stopContent: {
    flex: 1,
    marginLeft: 10,
  },

  stopRow: {
    flexDirection: "row",
    alignItems: "center",
    minHeight: 46,
  },

  stopTextContainer: {
    flex: 1,
  },

  stopLabel: {
    fontSize: 10,
    fontWeight: "700",
    color: "#999",
  },

  stopValue: {
    marginTop: 3,
    fontSize: 12,
    fontWeight: "700",
    color: colors.root.secondary,
  },

  stopSeparator: {
    height: 1,
    backgroundColor: "#EEEEEE",
  },

  changeButton: {
    height: 32,
    paddingHorizontal: 10,
    borderRadius: 9,
    backgroundColor: "#EEF8F3",
    alignItems: "center",
    justifyContent: "center",
  },

  changeButtonText: {
    fontSize: 10,
    fontWeight: "800",
    color: colors.root.green,
  },

  mapContainer: {
    marginTop: 10,
    height: 220,
    borderRadius: 18,
    overflow: "hidden",
  },

  map: {
    flex: 1,
  },

  mapOverlay: {
    position: "absolute",
    bottom: 10,
    left: 10,
    right: 10,
    minHeight: 38,
    borderRadius: 12,
    paddingHorizontal: 11,
    backgroundColor: "rgba(255,255,255,0.93)",
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  mapOverlayText: {
    flex: 1,
    fontSize: 10,
    fontWeight: "700",
    color: colors.root.secondary,
  },

  pickupMarker: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.root.green,
    borderWidth: 3,
    borderColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  dropoffMarker: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: colors.root.secondary,
    borderWidth: 3,
    borderColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  dateCard: {
    backgroundColor: colors.root.primary,
    borderRadius: 18,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
  },

  dateIcon: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: "#EEF8F3",
    alignItems: "center",
    justifyContent: "center",
  },

  dateContent: {
    flex: 1,
    marginLeft: 12,
  },

  dateLabel: {
    fontSize: 10,
    color: "#999",
    fontWeight: "700",
  },

  dateValue: {
    marginTop: 4,
    fontSize: 13,
    fontWeight: "800",
    color: colors.root.secondary,
    textTransform: "capitalize",
  },

  seatCard: {
    backgroundColor: colors.root.primary,
    borderRadius: 18,
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  seatTitle: {
    fontSize: 13,
    fontWeight: "800",
    color: colors.root.secondary,
  },

  seatDescription: {
    marginTop: 4,
    fontSize: 10,
    color: "#888",
  },

  counter: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  counterButton: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: "#F2F4F4",
    alignItems: "center",
    justifyContent: "center",
  },

  counterValue: {
    width: 22,
    textAlign: "center",
    fontSize: 15,
    fontWeight: "800",
    color: colors.root.secondary,
  },

  paymentList: {
    gap: 8,
  },

  paymentOption: {
    backgroundColor: colors.root.primary,
    borderRadius: 16,
    padding: 13,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "transparent",
  },

  paymentOptionSelected: {
    borderColor: colors.root.green,
    backgroundColor: "#F4FBF7",
  },

  paymentIcon: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: "#F1F3F4",
    alignItems: "center",
    justifyContent: "center",
  },

  paymentIconSelected: {
    backgroundColor: colors.root.secondary,
  },

  paymentContent: {
    flex: 1,
    marginLeft: 11,
  },

  paymentTitle: {
    fontSize: 13,
    fontWeight: "800",
    color: colors.root.secondary,
  },

  paymentDescription: {
    marginTop: 3,
    fontSize: 10,
    color: "#888",
  },

  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#D1D5DB",
    alignItems: "center",
    justifyContent: "center",
  },

  radioSelected: {
    borderColor: colors.root.green,
  },

  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.root.green,
  },

  summaryCard: {
    backgroundColor: colors.root.secondary,
    borderRadius: 20,
    padding: 17,
  },

  summaryTitle: {
    fontSize: 14,
    fontWeight: "800",
    color: colors.root.primary,
    marginBottom: 13,
  },

  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 9,
  },

  summaryLabel: {
    fontSize: 11,
    color: "rgba(255,255,255,0.58)",
  },

  summaryValue: {
    fontSize: 11,
    fontWeight: "700",
    color: colors.root.primary,
  },

  summarySeparator: {
    height: 1,
    backgroundColor: "rgba(255,255,255,0.1)",
    marginVertical: 8,
  },

  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  totalLabel: {
    fontSize: 14,
    fontWeight: "800",
    color: colors.root.primary,
  },

  totalValue: {
    fontSize: 20,
    fontWeight: "900",
    color: colors.root.green,
  },

  bottomBar: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  bottomPrice: {
    width: 95,
  },

  bottomPriceLabel: {
    fontSize: 10,
    color: "#999",
  },

  bottomPriceValue: {
    marginTop: 2,
    fontSize: 15,
    fontWeight: "900",
    color: colors.root.secondary,
  },

  reserveButton: {
    flex: 1,
    height: 52,
    borderRadius: 15,
    backgroundColor: colors.root.green,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },

  reserveButtonText: {
    fontSize: 13,
    fontWeight: "900",
    color: colors.root.primary,
  },

  backButton: {
    marginTop: 20,
    height: 48,
    paddingHorizontal: 20,
    borderRadius: 14,
    backgroundColor: colors.root.secondary,
    alignItems: "center",
    justifyContent: "center",
  },

  backButtonText: {
    color: colors.root.primary,
    fontWeight: "800",
  },

  errorContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 30,
    backgroundColor: "#F8F9FA",
  },

  errorTitle: {
    marginTop: 12,
    fontSize: 18,
    fontWeight: "800",
    color: colors.root.secondary,
  },

  errorDescription: {
    marginTop: 6,
    fontSize: 13,
    color: "#777",
    textAlign: "center",
  },

  pressed: {
    opacity: 0.7,
    transform: [{ scale: 0.98 }],
  },
});

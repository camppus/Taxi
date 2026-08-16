import { Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location";
import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import {
  Alert,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import DatePicker from "@/components/DatePicker";
import {
  LocationCommandModal,
  PlaceSuggestion,
} from "@/components/LocationCommandModal";
import RouteMap from "@/components/RouteMap";
import { mockVehicles } from "@/mocks/mockVehicles";
import color from "@/styles/color";
import { LatLng } from "react-native-maps";
import { reverseGeocode } from "@/util/location";

export default function CreateTripScreen() {
  const router = useRouter();
  const vehicles = useMemo(
    () =>
      mockVehicles.filter(
        (vehicle) => vehicle.status === "ACTIVE" && vehicle.isVerified,
      ),
    [],
  );
  const [origin, setOrigin] = useState<PlaceSuggestion | null>(null);
  const [destination, setDestination] = useState<PlaceSuggestion | null>(null);
  const [locationTarget, setLocationTarget] = useState<
    "origin" | "destination" | null
  >(null);
  const [isLocating, setIsLocating] = useState(false);
  const [tripDate, setTripDate] = useState<Date | null>(null);
  const [seats, setSeats] = useState(1);
  const [price, setPrice] = useState("");
  const [vehicleId, setVehicleId] = useState(vehicles[0]?.id ?? "");

  const vehicle = vehicles.find((item) => item.id === vehicleId);
  const isValid = Boolean(
    origin && destination && tripDate && price && Number(price) > 0 && vehicle,
  );

  const selectPlace = (place: PlaceSuggestion) => {
    if (locationTarget === "origin") setOrigin(place);
    if (locationTarget === "destination") setDestination(place);
    setLocationTarget(null);
  };

  const useCurrentLocation = async () => {
    try {
      setIsLocating(true);
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Localização indisponível",
          "Permita o acesso à localização para usar a sua posição atual.",
        );
        return;
      }
      const position = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });
      const coords: LatLng = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      };

      const placeName = await reverseGeocode(coords);
      selectPlace({
        id: "current-location",
        name: placeName ?? "Localização atual",
        address: "A sua posição atual",
        coords: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        },
      });
    } catch {
      Alert.alert(
        "Não foi possível obter a localização",
        "Tente novamente ou pesquise o local manualmente.",
      );
    } finally {
      setIsLocating(false);
    }
  };

  const publish = () => {
    if (!isValid) {
      Alert.alert(
        "Complete os dados",
        "Informe o trajeto, data, preço e veículo para publicar a viagem.",
      );
      return;
    }
    Alert.alert(
      "Viagem publicada",
      "A sua viagem já está visível para os passageiros.",
      [
        {
          text: "Ver viagens",
          onPress: () => router.replace("/(driver)/trips"),
        },
      ],
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Pressable
          onPress={() => router.back()}
          style={styles.backButton}
          hitSlop={10}
        >
          <Ionicons
            name="chevron-back"
            size={24}
            color={color.root.secondary}
          />
        </Pressable>
        <View>
          <Text style={styles.title}>Criar viagem</Text>
          <Text style={styles.subtitle}>
            Defina os detalhes da sua próxima rota
          </Text>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.sectionTitle}>Trajeto</Text>
        <View style={styles.card}>
          <View style={styles.routeLine} />
          <Pressable
            style={styles.routeField}
            onPress={() => setLocationTarget("origin")}
          >
            <View style={styles.fieldIcon}>
              <Ionicons
                name="radio-button-on-outline"
                size={18}
                color={color.root.green}
              />
            </View>
            <View style={styles.locationValue}>
              <Text style={styles.locationLabel}>PARTIDA</Text>
              <Text
                style={[
                  styles.locationName,
                  !origin && styles.locationPlaceholder,
                ]}
                numberOfLines={1}
              >
                {origin?.name ?? "Selecionar local de partida"}
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#A1A1AA" />
          </Pressable>
          <View style={styles.divider} />
          <Pressable
            style={styles.routeField}
            onPress={() => setLocationTarget("destination")}
          >
            <View style={styles.fieldIcon}>
              <Ionicons
                name="location-outline"
                size={19}
                color={color.root.secondary}
              />
            </View>
            <View style={styles.locationValue}>
              <Text style={styles.locationLabel}>DESTINO</Text>
              <Text
                style={[
                  styles.locationName,
                  !destination && styles.locationPlaceholder,
                ]}
                numberOfLines={1}
              >
                {destination?.name ?? "Selecionar destino"}
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#A1A1AA" />
          </Pressable>
        </View>

        {origin && destination && (
          <View style={styles.mapSection}>
            <Text style={styles.sectionTitle}>Pré-visualização da rota</Text>
            <RouteMap
              from={origin.name}
              to={destination.name}
              fromCoords={origin.coords}
              toCoords={destination.coords}
              routeCoords={[origin.coords, destination.coords]}
              title="Rota selecionada"
              showBottomCard={false}
            />
          </View>
        )}

        <Text style={styles.sectionTitle}>Quando vai partir?</Text>
        <DatePicker
          value={tripDate}
          onChange={setTripDate}
          minimumDate={new Date()}
          placeholder="Escolher data e hora"
        />

        <Text style={styles.sectionTitle}>Veículo</Text>
        <View style={styles.vehicleChoices}>
          {vehicles.map((item) => {
            const selected = item.id === vehicleId;
            return (
              <Pressable
                key={item.id}
                style={[
                  styles.vehicleOption,
                  selected && styles.vehicleOptionSelected,
                ]}
                onPress={() => {
                  setVehicleId(item.id);
                  setSeats(Math.min(seats, item.passengerSeats));
                }}
              >
                <View style={styles.vehicleIcon}>
                  <Ionicons
                    name="car-outline"
                    size={20}
                    color={selected ? color.root.green : "#737373"}
                  />
                </View>
                <View style={styles.vehicleText}>
                  <Text style={styles.vehicleName}>
                    {item.brand} {item.model}
                  </Text>
                  <Text style={styles.vehicleInfo}>
                    {item.plateNumber} · até {item.passengerSeats} lugares
                  </Text>
                </View>
                <Ionicons
                  name={selected ? "radio-button-on" : "radio-button-off"}
                  size={21}
                  color={selected ? color.root.green : "#B0B0B0"}
                />
              </Pressable>
            );
          })}
        </View>

        <Text style={styles.sectionTitle}>Lugares e preço</Text>
        <View style={styles.card}>
          <View style={styles.detailRow}>
            <View>
              <Text style={styles.fieldLabel}>Lugares disponíveis</Text>
              <Text style={styles.fieldHint}>
                Máximo: {vehicle?.passengerSeats ?? 0}
              </Text>
            </View>
            <View style={styles.counter}>
              <Pressable
                style={styles.counterButton}
                onPress={() => setSeats((value) => Math.max(1, value - 1))}
              >
                <Ionicons
                  name="remove"
                  size={18}
                  color={color.root.secondary}
                />
              </Pressable>
              <Text style={styles.counterValue}>{seats}</Text>
              <Pressable
                style={styles.counterButton}
                onPress={() =>
                  setSeats((value) =>
                    Math.min(vehicle?.passengerSeats ?? 1, value + 1),
                  )
                }
              >
                <Ionicons name="add" size={18} color={color.root.secondary} />
              </Pressable>
            </View>
          </View>
          <View style={styles.divider} />
          <Text style={styles.fieldLabel}>Preço por passageiro</Text>
          <View style={styles.priceInput}>
            <TextInput
              value={price}
              onChangeText={setPrice}
              keyboardType="numeric"
              placeholder="0"
              placeholderTextColor="#A1A1AA"
              style={styles.priceTextInput}
            />
            <Text style={styles.currency}>Kz</Text>
          </View>
        </View>

        <View style={styles.notice}>
          <Ionicons
            name="information-circle-outline"
            size={19}
            color="#587063"
          />
          <Text style={styles.noticeText}>
            A viagem será publicada assim que confirmar os dados.
          </Text>
        </View>

        <Pressable
          style={[
            styles.publishButton,
            !isValid && styles.publishButtonDisabled,
          ]}
          onPress={publish}
        >
          <Text style={styles.publishText}>Publicar viagem</Text>
          <Ionicons name="arrow-forward" size={19} color="#fff" />
        </Pressable>
      </ScrollView>
      <LocationCommandModal
        visible={locationTarget !== null}
        title={
          locationTarget === "origin"
            ? "Selecionar partida"
            : "Selecionar destino"
        }
        onClose={() => setLocationTarget(null)}
        onSelect={selectPlace}
        onUseCurrentLocation={
          locationTarget === "origin" ? useCurrentLocation : undefined
        }
        isLocating={isLocating}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#fff" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16,
    gap: 12,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 13,
    backgroundColor: "#F5F5F5",
    alignItems: "center",
    justifyContent: "center",
  },
  title: { fontSize: 21, fontWeight: "800", color: color.root.secondary },
  subtitle: { color: "#737373", fontSize: 12, marginTop: 2 },
  content: { paddingHorizontal: 16, paddingBottom: 24 },
  sectionTitle: {
    color: color.root.secondary,
    fontSize: 15,
    fontWeight: "800",
    marginTop: 20,
    marginBottom: 9,
  },
  card: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 17,
    padding: 14,
  },
  routeField: {
    minHeight: 47,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  fieldIcon: { width: 22, alignItems: "center" },
  routeLine: {
    position: "absolute",
    width: 1,
    left: 25,
    top: 41,
    height: 31,
    backgroundColor: "#D6D6D6",
  },
  locationValue: { flex: 1 },
  locationLabel: {
    fontSize: 9,
    color: "#8E8E93",
    fontWeight: "800",
    letterSpacing: 0.7,
    marginBottom: 3,
  },
  locationName: {
    color: color.root.secondary,
    fontSize: 14,
    fontWeight: "700",
  },
  locationPlaceholder: { color: "#A1A1AA", fontWeight: "500" },
  mapSection: { marginTop: -2 },
  divider: { height: 1, backgroundColor: "#EEEEEE", marginVertical: 11 },
  vehicleChoices: { gap: 8 },
  vehicleOption: {
    minHeight: 67,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 16,
    paddingHorizontal: 13,
    flexDirection: "row",
    alignItems: "center",
  },
  vehicleOptionSelected: {
    borderColor: color.root.green,
    backgroundColor: "#F4FBF7",
  },
  vehicleIcon: {
    width: 37,
    height: 37,
    borderRadius: 11,
    backgroundColor: "#F2F2F2",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  vehicleText: { flex: 1 },
  vehicleName: { fontSize: 14, fontWeight: "800", color: color.root.secondary },
  vehicleInfo: { fontSize: 11, color: "#737373", marginTop: 3 },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  fieldLabel: { fontSize: 14, fontWeight: "700", color: color.root.secondary },
  fieldHint: { fontSize: 11, color: "#8E8E93", marginTop: 3 },
  counter: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E5E5",
    borderRadius: 11,
    overflow: "hidden",
  },
  counterButton: {
    width: 34,
    height: 34,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FAFAFA",
  },
  counterValue: {
    width: 29,
    textAlign: "center",
    fontWeight: "800",
    color: color.root.secondary,
  },
  priceInput: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 9,
    height: 45,
    borderRadius: 12,
    backgroundColor: "#F8F8F8",
    paddingHorizontal: 12,
  },
  priceTextInput: {
    flex: 1,
    fontSize: 16,
    color: color.root.secondary,
    fontWeight: "700",
  },
  currency: { fontSize: 14, fontWeight: "800", color: "#737373" },
  notice: {
    flexDirection: "row",
    gap: 8,
    backgroundColor: "#F1F7F3",
    padding: 12,
    borderRadius: 13,
    marginTop: 18,
  },
  noticeText: { flex: 1, color: "#587063", fontSize: 12, lineHeight: 17 },
  footer: {
    borderTopWidth: 1,
    borderColor: "#EEEEEE",
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 15,
  },
  publishButton: {
    height: 54,
    borderRadius: 16,
    backgroundColor: color.root.green,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    marginBottom: 70,
    marginTop: 10,
    gap: 8,
  },
  publishButtonDisabled: { backgroundColor: "#A7DDBB" },
  publishText: { color: "#fff", fontSize: 15, fontWeight: "800" },
});

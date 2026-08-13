import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location";
import colors from "@/styles/color";
import DatePicker from "@/components/DatePicker";
import {
  LocationCommandModal,
  PlaceSuggestion,
} from "@/components/LocationCommandModal";
import PromoBanner from "@/components/PromoBanner";
import { useRouter } from "expo-router";
import { useRecentSearches } from "@/hooks/useRecentSearches";

type LatLng = { latitude: number; longitude: number };
const MIN_SEATS = 1;
const MAX_SEATS = 6;

const reverseGeocode = async (coords: LatLng): Promise<string | null> => {
  try {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${coords.latitude}&lon=${coords.longitude}&zoom=16&addressdetails=1`;
    const response = await fetch(url, { headers: { "Accept-Language": "pt" } });
    const data = await response.json();
    const address = data?.address;
    return (
      address?.suburb ||
      address?.neighbourhood ||
      address?.city_district ||
      address?.town ||
      address?.city ||
      address?.road ||
      data?.display_name ||
      null
    );
  } catch (error) {
    console.log("Erro no reverse geocode:", error);
    return null;
  }
};

export default function SearchTripScreen() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [fromCoords, setFromCoords] = useState<LatLng | null>(null);
  const [toCoords, setToCoords] = useState<LatLng | null>(null);
  const {
    recents,
    loading: recentsLoading,
    addSearch,
    clearSearches,
  } = useRecentSearches();
  const [seats, setSeats] = useState(1);
  const [date, setDate] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [activeModal, setActiveModal] = useState<"from" | "to" | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  const canSearch = Boolean(from && to && date);
  const router = useRouter();
  const handleUseCurrentLocation = async () => {
    try {
      setIsLocating(true);
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") return;

      const position = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });
      const coords: LatLng = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      };

      const placeName = await reverseGeocode(coords);
      setFrom(placeName ?? "Localização atual");
      setFromCoords(coords);
      setActiveModal(null);
    } catch (error) {
      console.log("Erro ao obter localização:", error);
    } finally {
      setIsLocating(false);
    }
  };

  const handleSelectPlace = (place: PlaceSuggestion) => {
    if (activeModal === "from") {
      setFrom(place.name);
      setFromCoords(place.coords);
    } else if (activeModal === "to") {
      setTo(place.name);
      setToCoords(place.coords);
    }
    setActiveModal(null);
  };

  const handleSearch = async () => {
    if (!canSearch) return;
    console.log({ from, fromCoords, to, toCoords, seats, date });
    await addSearch(from, to, seats, date?.toString() ?? new Date().toString());
    router.push({
      pathname: "/trip-details",
      params: {
        from,
        to,
        seats,
        date: date?.toString(),
      },
    });
  };
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 40 }}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Buscar viagem</Text>
        <Text style={styles.subtitle}>
          Preenche os dados para encontrar boleias
        </Text>
      </View>

      <View style={styles.card}>
        <View style={styles.locationSection}>
          <View style={styles.inputRow}>
            <View style={styles.iconColumn}>
              <View style={styles.fromDot} />
              <View style={styles.verticalLine} />
            </View>

            <TouchableOpacity
              style={styles.inputContainer}
              activeOpacity={0.7}
              onPress={() => setActiveModal("from")}
            >
              <Text style={styles.label}>DE</Text>
              <Text
                style={[styles.fakeInputText, !from && styles.placeholderText]}
              >
                {from || "Local de partida"}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.inputRow}>
            <View style={styles.iconColumn}>
              <View style={styles.toDot}>
                <View style={styles.toDotInner} />
              </View>
            </View>

            <TouchableOpacity
              style={styles.inputContainer}
              activeOpacity={0.7}
              onPress={() => setActiveModal("to")}
            >
              <Text style={styles.label}>PARA</Text>
              <Text
                style={[styles.fakeInputText, !to && styles.placeholderText]}
              >
                {to || "Destino"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.filtersRow}>
          <View style={styles.seatsBox}>
            <Text style={styles.label}>LUGARES</Text>
            <View style={styles.stepperRow}>
              <TouchableOpacity
                style={[
                  styles.stepperBtn,
                  seats <= MIN_SEATS && styles.stepperBtnDisabled,
                ]}
                onPress={() => setSeats((s) => Math.max(MIN_SEATS, s - 1))}
                disabled={seats <= MIN_SEATS}
              >
                <Ionicons
                  name="remove"
                  size={16}
                  color={colors.root.secondary}
                />
              </TouchableOpacity>

              <View style={styles.stepperValueWrapper}>
                <Ionicons name="people" size={14} color={colors.root.green} />
                <Text style={styles.stepperValue}>{seats}</Text>
              </View>

              <TouchableOpacity
                style={[
                  styles.stepperBtn,
                  seats >= MAX_SEATS && styles.stepperBtnDisabled,
                ]}
                onPress={() => setSeats((s) => Math.min(MAX_SEATS, s + 1))}
                disabled={seats >= MAX_SEATS}
              >
                <Ionicons name="add" size={16} color={colors.root.secondary} />
              </TouchableOpacity>
            </View>
          </View>
          <DatePicker
            value={date}
            onChange={setDate}
            minimumDate={new Date()}
          />
        </View>

        {canSearch && (
          <TouchableOpacity
            style={[
              styles.searchButton,
              !canSearch && styles.searchButtonDisabled,
            ]}
            onPress={handleSearch}
            activeOpacity={0.85}
          >
            <Text style={styles.searchButtonText}>Buscar viagens</Text>
            <View style={styles.searchButtonIcon}>
              <Ionicons
                name="arrow-forward"
                size={19}
                color={colors.root.secondary}
              />
            </View>
          </TouchableOpacity>
        )}
      </View>

      <PromoBanner
        title="Viaja do teu jeito"
        subtitle="Encontra viagens disponíveis e reserva em poucos segundos."
        onPress={() => {}}
      />

      <View
        style={{
          paddingHorizontal: 20,
          marginBottom: recents.length > 0 ? 150 : 0,
        }}
      >
        {recents.length > 0 && (
          <View style={styles.recentHeader}>
            <Text style={styles.recentTitle}>Locais recentes</Text>
            <TouchableOpacity onPress={clearSearches}>
              <Text style={styles.clearText}>Limpar</Text>
            </TouchableOpacity>
          </View>
        )}
        <FlatList
          data={recents}
          keyExtractor={(item, index) => `${item.from}-${item.to}-${index}`}
          scrollEnabled={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.recentItem}
              activeOpacity={0.4}
              onPress={() => {
                router.push({
                  pathname: "/trip-details",
                  params: {
                    from: item.from,
                    to: item.to,
                    seats,
                    date: item.timestamp,
                  },
                });
              }}
            >
              <View style={styles.recentIcon}>
                <Ionicons
                  name="time-outline"
                  size={19}
                  color={colors.root.textTint}
                />
              </View>
              <View style={styles.recentInfo}>
                <Text style={styles.recentName} numberOfLines={1}>
                  {item.from} → {item.to}
                </Text>

                <Text style={styles.recentAddress}>
                  {new Date(item.timestamp).toLocaleDateString("pt-AO")}
                </Text>
              </View>

              <Ionicons name="chevron-forward" size={18} color="#B0B0B0" />
            </TouchableOpacity>
          )}
          ListEmptyComponent={
            <Text style={styles.emptyRecent}>Nenhuma rota recente</Text>
          }
        />
      </View>

      <LocationCommandModal
        visible={activeModal === "from"}
        title="De onde vais partir?"
        onClose={() => setActiveModal(null)}
        onSelect={handleSelectPlace}
        onUseCurrentLocation={handleUseCurrentLocation}
        isLocating={isLocating}
      />

      <LocationCommandModal
        visible={activeModal === "to"}
        title="Para onde vais?"
        onClose={() => setActiveModal(null)}
        onSelect={handleSelectPlace}
      />
      {Platform.OS === "ios" && showDatePicker && (
        <TouchableOpacity
          style={styles.iosDateConfirm}
          onPress={() => setShowDatePicker(false)}
        >
          <Text style={styles.iosDateConfirmText}>Confirmar</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { paddingHorizontal: 20, paddingTop: 20, paddingBottom: 20 },
  title: { fontSize: 26, fontWeight: "800", color: colors.root.secondary },
  subtitle: { fontSize: 14, color: colors.root.textTint, marginTop: 4 },
  emptyRecent: {
    textAlign: "center",
    color: "#A0A0A0",
    fontSize: 13,
    marginTop: 50,
  },
  recentHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 8,
  },
  recentTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.root.secondary,
  },
  clearText: { fontSize: 13, color: colors.root.green, fontWeight: "700" },
  recentItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 6,
    marginVertical: 4,
  },
  recentIcon: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: "#F3F4F5",
    alignItems: "center",
    justifyContent: "center",
  },
  recentInfo: { flex: 1, marginLeft: 12 },
  recentName: { fontSize: 14, fontWeight: "700", color: colors.root.secondary },
  recentAddress: { fontSize: 12, color: colors.root.textTint, marginTop: 2 },
  card: {
    marginHorizontal: 18,
    borderRadius: 22,
    elevation: 4,
  },

  locationSection: {
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 18,
    paddingVertical: 5,
    backgroundColor: "#FAFAFA",
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    minHeight: 66,
    paddingHorizontal: 15,
  },
  iconColumn: {
    width: 25,
    alignItems: "center",
    alignSelf: "stretch",
    justifyContent: "center",
  },
  fromDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.root.secondary,
    borderWidth: 3,
    borderColor: "#D9DEE5",
  },
  toDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: colors.root.green,
    alignItems: "center",
    justifyContent: "center",
  },
  toDotInner: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: colors.root.primary,
  },
  verticalLine: {
    width: 1,
    height: 26,
    backgroundColor: "#D4D4D4",
    marginVertical: 2,
  },
  inputContainer: { flex: 1, marginLeft: 12, paddingVertical: 6 },
  label: {
    fontSize: 10,
    fontWeight: "800",
    color: colors.root.textTint,
    letterSpacing: 0.8,
    marginBottom: 3,
  },
  fakeInputText: {
    fontSize: 16,
    color: colors.root.secondary,
    fontWeight: "600",
  },
  placeholderText: { color: "#A0A0A0", fontWeight: "500" },

  filtersRow: { flexDirection: "row", gap: 12, marginTop: 14 },
  seatsBox: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 16,
    backgroundColor: "#FAFAFA",
    padding: 12,
  },
  stepperRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 6,
  },
  stepperBtn: {
    width: 30,
    height: 30,
    borderRadius: 10,
    backgroundColor: "#EFEFEF",
    alignItems: "center",
    justifyContent: "center",
  },
  stepperBtnDisabled: { opacity: 0.4 },
  stepperValueWrapper: { flexDirection: "row", alignItems: "center", gap: 5 },
  stepperValue: {
    fontSize: 16,
    fontWeight: "800",
    color: colors.root.secondary,
  },

  dateBox: {
    flex: 1.3,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 16,
    backgroundColor: "#FAFAFA",
    padding: 12,
    justifyContent: "center",
  },
  dateValueRow: { flexDirection: "row", alignItems: "center", marginTop: 6 },
  dateValueText: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.root.secondary,
  },
  dateTimeText: { fontSize: 11, color: colors.root.textTint, marginTop: 1 },

  searchButton: {
    height: 57,
    borderRadius: 17,
    backgroundColor: colors.root.green,
    marginTop: 18,
    paddingLeft: 20,
    paddingRight: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  searchButtonDisabled: { backgroundColor: "#C9EAD7" },
  searchButtonText: {
    color: colors.root.secondary,
    fontSize: 16,
    fontWeight: "800",
  },
  searchButtonIcon: {
    width: 43,
    height: 43,
    borderRadius: 13,
    backgroundColor: colors.root.primary,
    alignItems: "center",
    justifyContent: "center",
  },

  // ---- Modal / Command ----
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.35)",
    justifyContent: "flex-end",
  },
  modalSheet: {
    backgroundColor: colors.root.primary,
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
    paddingHorizontal: 20,
    paddingTop: 10,
    height: "82%",
  },
  modalHandle: {
    width: 42,
    height: 4,
    borderRadius: 10,
    backgroundColor: "#D8D8D8",
    alignSelf: "center",
    marginBottom: 14,
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 14,
  },
  modalTitle: { fontSize: 17, fontWeight: "800", color: colors.root.secondary },

  commandInputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    backgroundColor: "#FAFAFA",
    borderRadius: 14,
    paddingHorizontal: 14,
    height: 48,
    marginBottom: 10,
  },
  commandInput: { flex: 1, fontSize: 15, color: colors.root.secondary },

  currentLocationRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
    marginBottom: 4,
  },
  currentLocationIcon: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: "#EAF9F0",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  currentLocationText: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.root.green,
  },

  resultRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 11,
  },
  resultIcon: {
    width: 34,
    height: 34,
    borderRadius: 11,
    backgroundColor: "#F3F4F5",
    alignItems: "center",
    justifyContent: "center",
  },
  resultTextWrapper: { flex: 1, marginLeft: 12 },
  resultName: { fontSize: 14, fontWeight: "700", color: colors.root.secondary },
  resultAddress: { fontSize: 12, color: colors.root.textTint, marginTop: 2 },

  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 50,
    gap: 8,
  },
  emptyStateText: { fontSize: 13, color: "#A0A0A0" },

  iosDateConfirm: {
    position: "absolute",
    bottom: 20,
    alignSelf: "center",
    backgroundColor: colors.root.green,
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 14,
  },
  iosDateConfirmText: { color: colors.root.secondary, fontWeight: "800" },
  datePickerSheet: {
    backgroundColor: colors.root.primary,
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 30,
  },
  datePickerWrapper: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FAFAFA",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    paddingVertical: 8,
  },
  datePicker: {
    width: "100%",
    height: Platform.OS === "ios" ? 200 : undefined,
  },
  confirmDateButton: {
    height: 54,
    borderRadius: 16,
    backgroundColor: colors.root.green,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
  },
  confirmDateButtonText: {
    color: colors.root.secondary,
    fontSize: 15,
    fontWeight: "800",
  },
});

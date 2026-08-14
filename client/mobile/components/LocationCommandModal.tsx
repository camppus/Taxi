import color from "@/styles/color";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { LatLng } from "react-native-maps";

type LocationCommandModalProps = {
  visible: boolean;
  title: string;
  onClose: () => void;
  onSelect: (place: PlaceSuggestion) => void;
  onUseCurrentLocation?: () => void;
  isLocating?: boolean;
};

const SEARCH_DEBOUNCE_MS = 400;
export type PlaceSuggestion = {
  id: string;
  name: string;
  address: string;
  coords: LatLng;
};

const searchPlaces = async (query: string): Promise<PlaceSuggestion[]> => {
  try {
    const search = query.toLowerCase().includes("angola")
      ? query
      : `${query}, Luanda, Angola`;

    const params = new URLSearchParams({
      format: "jsonv2",
      q: search,
      addressdetails: "1",
      extratags: "1",
      namedetails: "1",
      entrances: "1",
      "accept-language": "pt,en",
      countrycodes: "ao",
      limit: "40",
    });

    const url = `https://nominatim.openstreetmap.org/search?${params.toString()}`;

    const response = await fetch(url, { headers: { "Accept-Language": "pt" } });
    const data = await response.json();

    if (!Array.isArray(data)) return [];

    return data.map((item: any, index: number) => ({
      id: `${item.place_id ?? index}`,
      name:
        item.address?.suburb ||
        item.address?.neighbourhood ||
        item.address?.road ||
        item.address?.city ||
        item.display_name.split(",")[0],
      address: item.display_name,
      coords: {
        latitude: parseFloat(item.lat),
        longitude: parseFloat(item.lon),
      },
    }));
  } catch (error) {
    console.log("Erro na busca de locais:", error);
    return [];
  }
};

export function LocationCommandModal({
  visible,
  title,
  onClose,
  onSelect,
  onUseCurrentLocation,
  isLocating,
}: LocationCommandModalProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<PlaceSuggestion[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (visible) {
      setQuery("");
      setResults([]);
      setTimeout(() => inputRef.current?.focus(), 250);
    }
  }, [visible]);

  useEffect(() => {
    if (query.trim().length < 3) {
      setResults([]);
      return;
    }

    setLoading(true);
    const timeout = setTimeout(async () => {
      const places = await searchPlaces(query);
      setResults(places);
      setLoading(false);
    }, SEARCH_DEBOUNCE_MS);

    return () => clearTimeout(timeout);
  }, [query]);

  return (
    <Modal
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
      transparent
    >
      <View style={styles.modalOverlay}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={styles.modalSheet}
        >
          <View style={styles.modalHandle} />

          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>{title}</Text>
            <TouchableOpacity onPress={onClose} hitSlop={10}>
              <Ionicons name="close" size={22} color={color.root.textTint} />
            </TouchableOpacity>
          </View>

          <View style={styles.commandInputWrapper}>
            <Ionicons name="search" size={18} color={color.root.textTint} />
            <TextInput
              ref={inputRef}
              value={query}
              onChangeText={setQuery}
              placeholder="Pesquisar local ou endereço..."
              placeholderTextColor="#A0A0A0"
              style={styles.commandInput}
            />
            {loading && (
              <ActivityIndicator size="small" color={color.root.green} />
            )}
          </View>

          {onUseCurrentLocation && query.trim().length === 0 && (
            <TouchableOpacity
              style={styles.currentLocationRow}
              onPress={onUseCurrentLocation}
              disabled={isLocating}
              activeOpacity={0.7}
            >
              <View style={styles.currentLocationIcon}>
                {isLocating ? (
                  <ActivityIndicator size="small" color={color.root.green} />
                ) : (
                  <Ionicons
                    name="navigate"
                    size={16}
                    color={color.root.green}
                  />
                )}
              </View>
              <Text style={styles.currentLocationText}>
                Usar minha localização atual
              </Text>
            </TouchableOpacity>
          )}

          <FlatList
            data={results}
            keyExtractor={(item) => item.id}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{ paddingBottom: 24 }}
            ListEmptyComponent={
              query.trim().length >= 3 && !loading ? (
                <View style={styles.emptyState}>
                  <Ionicons name="location-outline" size={26} color="#C4C4C4" />
                  <Text style={styles.emptyStateText}>
                    Nenhum local encontrado
                  </Text>
                </View>
              ) : null
            }
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.resultRow}
                onPress={() => onSelect(item)}
                activeOpacity={0.7}
              >
                <View style={styles.resultIcon}>
                  <Ionicons
                    name="location"
                    size={16}
                    color={color.root.textTint}
                  />
                </View>
                <View style={styles.resultTextWrapper}>
                  <Text style={styles.resultName} numberOfLines={1}>
                    {item.name}
                  </Text>
                  <Text style={styles.resultAddress} numberOfLines={1}>
                    {item.address}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: color.root.primary },
  header: { paddingHorizontal: 20, paddingTop: 20, paddingBottom: 20 },
  title: { fontSize: 26, fontWeight: "800", color: color.root.secondary },
  subtitle: { fontSize: 14, color: color.root.textTint, marginTop: 4 },

  card: {
    marginHorizontal: 10,
    borderRadius: 22,
    backgroundColor: color.root.primary,
    borderWidth: 1,
    borderColor: "#EFEFEF",
    padding: 16,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
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
    backgroundColor: color.root.secondary,
    borderWidth: 3,
    borderColor: "#D9DEE5",
  },
  toDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: color.root.green,
    alignItems: "center",
    justifyContent: "center",
  },
  toDotInner: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: color.root.primary,
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
    color: color.root.textTint,
    letterSpacing: 0.8,
    marginBottom: 3,
  },
  fakeInputText: {
    fontSize: 16,
    color: color.root.secondary,
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
    color: color.root.secondary,
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
    color: color.root.secondary,
  },
  dateTimeText: { fontSize: 11, color: color.root.textTint, marginTop: 1 },

  searchButton: {
    height: 57,
    borderRadius: 17,
    backgroundColor: color.root.green,
    marginTop: 18,
    paddingLeft: 20,
    paddingRight: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  searchButtonDisabled: { backgroundColor: "#C9EAD7" },
  searchButtonText: {
    color: color.root.secondary,
    fontSize: 16,
    fontWeight: "800",
  },
  searchButtonIcon: {
    width: 43,
    height: 43,
    borderRadius: 13,
    backgroundColor: color.root.primary,
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
    backgroundColor: color.root.primary,
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
  modalTitle: { fontSize: 17, fontWeight: "800", color: color.root.secondary },

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
  commandInput: { flex: 1, fontSize: 15, color: color.root.secondary },

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
    color: color.root.green,
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
  resultName: { fontSize: 14, fontWeight: "700", color: color.root.secondary },
  resultAddress: { fontSize: 12, color: color.root.textTint, marginTop: 2 },

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
    backgroundColor: color.root.green,
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 14,
  },
  iosDateConfirmText: { color: color.root.secondary, fontWeight: "800" },
  datePickerSheet: {
    backgroundColor: color.root.primary,
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
    backgroundColor: color.root.green,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
  },
  confirmDateButtonText: {
    color: color.root.secondary,
    fontSize: 15,
    fontWeight: "800",
  },
});

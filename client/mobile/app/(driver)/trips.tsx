import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { FlatList, Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { mockTrips } from "@/mocks/trip";
import color from "@/styles/color";

export default function DriverTripsScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Minhas viagens</Text>
          <Text style={styles.subtitle}>Gerencie as viagens que publicou</Text>
        </View>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Criar viagem"
          style={styles.addButton}
          onPress={() => router.push("/(driver)/trips/create")}
        >
          <Ionicons name="add" size={24} color="#fff" />
        </Pressable>
      </View>

      <FlatList
        data={mockTrips}
        keyExtractor={(trip) => trip.id}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <Pressable
            style={styles.card}
            onPress={() => router.push(`/(driver)/trips/${item.id}`)}
          >
            <View style={styles.dateBox}>
              <Text style={styles.day}>{item.departureDate.slice(-2)}</Text>
              <Text style={styles.month}>AGO</Text>
            </View>
            <View style={styles.cardContent}>
              <Text style={styles.route} numberOfLines={1}>{item.name}</Text>
              <View style={styles.metaRow}>
                <Ionicons name="time-outline" size={15} color="#737373" />
                <Text style={styles.meta}>{item.departureTime}</Text>
                <Text style={styles.dot}>•</Text>
                <Ionicons name="people-outline" size={15} color="#737373" />
                <Text style={styles.meta}>{item.publishedSeats} lugares</Text>
              </View>
              <Text style={styles.vehicle}>{item.vehicle.brand} {item.vehicle.model} · {item.vehicle.plateNumber}</Text>
            </View>
            <View style={styles.priceColumn}>
              <Text style={styles.price}>{item.priceBase.toLocaleString("pt-AO")} Kz</Text>
              <Ionicons name="chevron-forward" size={19} color="#A1A1AA" />
            </View>
          </Pressable>
        )}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Ionicons name="car-outline" size={46} color="#C7C7CC" />
            <Text style={styles.emptyTitle}>Ainda não há viagens</Text>
            <Text style={styles.emptyText}>Publique a sua primeira viagem para começar a receber pedidos.</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#fff" },
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 20, paddingTop: 12, paddingBottom: 18 },
  title: { fontSize: 24, fontWeight: "800", color: color.root.secondary },
  subtitle: { fontSize: 13, color: "#737373", marginTop: 3 },
  addButton: { width: 44, height: 44, borderRadius: 14, alignItems: "center", justifyContent: "center", backgroundColor: color.root.green },
  content: { paddingHorizontal: 16, paddingBottom: 110, gap: 10 },
  card: { minHeight: 100, borderWidth: 1, borderColor: "#EEEEF0", borderRadius: 18, padding: 12, flexDirection: "row", alignItems: "center", backgroundColor: "#fff" },
  dateBox: { width: 50, height: 58, borderRadius: 13, backgroundColor: "#EAF8F0", alignItems: "center", justifyContent: "center", marginRight: 12 },
  day: { color: color.root.green, fontSize: 20, fontWeight: "800" },
  month: { color: "#578467", fontSize: 10, fontWeight: "800", marginTop: 1 },
  cardContent: { flex: 1 },
  route: { fontSize: 15, fontWeight: "800", color: color.root.secondary },
  metaRow: { flexDirection: "row", alignItems: "center", gap: 4, marginTop: 7 },
  meta: { fontSize: 12, color: "#737373" },
  dot: { color: "#A1A1AA", marginHorizontal: 2 },
  vehicle: { fontSize: 11, color: "#8E8E93", marginTop: 7 },
  priceColumn: { alignItems: "flex-end", justifyContent: "space-between", alignSelf: "stretch" },
  price: { fontSize: 12, fontWeight: "800", color: color.root.secondary },
  empty: { paddingHorizontal: 42, paddingTop: 90, alignItems: "center" },
  emptyTitle: { fontSize: 17, fontWeight: "800", color: color.root.secondary, marginTop: 14 },
  emptyText: { textAlign: "center", color: "#737373", fontSize: 13, lineHeight: 19, marginTop: 6 },
});

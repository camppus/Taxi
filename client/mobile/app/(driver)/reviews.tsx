import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import colors from "@/styles/color";

type Review = {
  id: string;
  trip: {
    name: string;
    date: string;
    driver: {
      name: string;
      photoUrl?: string;
    };
    vehicle: {
      brand: string;
      model: string;
      plate: string;
    };
  };
  rating: number;
  comment: string;
  createdAt: string;
};

const mockReviews: Review[] = [
  {
    id: "review-001",
    trip: {
      name: "Luanda → Talatona",
      date: "14 Ago 2026",
      driver: {
        name: "Carlos Manuel",
        photoUrl: "https://randomuser.me/api/portraits/men/32.jpg",
      },
      vehicle: {
        brand: "Toyota",
        model: "Corolla",
        plate: "LD-45-82-AB",
      },
    },
    rating: 5,
    comment:
      "Excelente viagem. O motorista foi pontual, educado e o carro estava muito confortável.",
    createdAt: "Hoje",
  },

  {
    id: "review-002",
    trip: {
      name: "Kilamba → Maianga",
      date: "12 Ago 2026",
      driver: {
        name: "Ana Paula José",
        photoUrl: "https://randomuser.me/api/portraits/women/44.jpg",
      },
      vehicle: {
        brand: "Hyundai",
        model: "Tucson",
        plate: "LD-72-19-CD",
      },
    },
    rating: 4,
    comment: "Boa experiência. Chegámos ao destino sem problemas.",
    createdAt: "Há 2 dias",
  },

  {
    id: "review-003",
    trip: {
      name: "Viana → Benfica",
      date: "10 Ago 2026",
      driver: {
        name: "João António",
        photoUrl: "https://randomuser.me/api/portraits/men/46.jpg",
      },
      vehicle: {
        brand: "Toyota",
        model: "Hiace",
        plate: "LD-18-54-EF",
      },
    },
    rating: 5,
    comment: "Muito bom motorista. Foi bastante atencioso durante a viagem.",
    createdAt: "Há 4 dias",
  },
];

export default function ReviewsPage() {
  const router = useRouter();

  const average =
    mockReviews.reduce((sum, review) => sum + review.rating, 0) /
    mockReviews.length;

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* HEADER */}
      <View style={styles.header}>
        <Pressable
          onPress={() => router.back()}
          style={({ pressed }) => [
            styles.iconButton,
            pressed && styles.pressed,
          ]}
        >
          <Ionicons
            name="chevron-back"
            size={23}
            color={colors.root.secondary}
          />
        </Pressable>

        <View>
          <Text style={styles.headerTitle}>Avaliações</Text>
          <Text style={styles.headerSubtitle}>As avaliações que recebeste</Text>
        </View>

        <View style={{ width: 42 }} />
      </View>

      {/* SUMMARY */}
      <View style={styles.summaryCard}>
        <View style={styles.summaryRating}>
          <Text style={styles.average}>{average.toFixed(1)}</Text>

          <View style={styles.stars}>
            {Array.from({ length: 5 }).map((_, index) => (
              <Ionicons
                key={index}
                name={index < Math.round(average) ? "star" : "star-outline"}
                size={18}
                color="#F59E0B"
              />
            ))}
          </View>

          <Text style={styles.summaryCount}>
            {mockReviews.length} avaliações feitas
          </Text>
        </View>

        <View style={styles.summaryIcon}>
          <Ionicons name="star" size={28} color={colors.root.green} />
        </View>
      </View>

      {/* REVIEWS */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Histórico</Text>

        <View style={styles.reviewList}>
          {mockReviews.map((review) => (
            <View key={review.id} style={styles.reviewCard}>
              {/* TRIP */}
              <View style={styles.tripHeader}>
                <View style={styles.tripIcon}>
                  <Ionicons
                    name="car-outline"
                    size={19}
                    color={colors.root.green}
                  />
                </View>

                <View style={styles.tripInfo}>
                  <Text style={styles.tripName}>{review.trip.name}</Text>

                  <Text style={styles.tripDate}>{review.trip.date}</Text>
                </View>

                <Text style={styles.reviewDate}>{review.createdAt}</Text>
              </View>

              <View style={styles.separator} />

              {/* DRIVER */}
              <View style={styles.driver}>
                {review.trip.driver.photoUrl ? (
                  <Image
                    source={{
                      uri: review.trip.driver.photoUrl,
                    }}
                    style={styles.avatar}
                  />
                ) : (
                  <View style={styles.avatarPlaceholder}>
                    <Ionicons
                      name="person"
                      size={18}
                      color={colors.root.secondary}
                    />
                  </View>
                )}

                <View style={styles.driverInfo}>
                  <Text style={styles.driverName}>
                    {review.trip.driver.name}
                  </Text>

                  <Text style={styles.vehicle}>
                    {review.trip.vehicle.brand} {review.trip.vehicle.model} ·{" "}
                    {review.trip.vehicle.plate}
                  </Text>
                </View>
              </View>

              {/* RATING */}
              <View style={styles.ratingRow}>
                <View style={styles.stars}>
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Ionicons
                      key={index}
                      name={index < review.rating ? "star" : "star-outline"}
                      size={17}
                      color="#F59E0B"
                    />
                  ))}
                </View>

                <Text style={styles.ratingNumber}>{review.rating}/5</Text>
              </View>

              {/* COMMENT */}
              <Text style={styles.comment}>{review.comment}</Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F8F9FA",
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
    marginBottom: 20,
  },

  iconButton: {
    width: 42,
    height: 42,
    borderRadius: 13,
    backgroundColor: colors.root.primary,
    alignItems: "center",
    justifyContent: "center",
  },

  headerTitle: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "900",
    color: colors.root.secondary,
  },

  headerSubtitle: {
    marginTop: 3,
    textAlign: "center",
    fontSize: 11,
    color: "#888",
  },

  summaryCard: {
    backgroundColor: colors.root.secondary,
    borderRadius: 20,
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 25,
  },

  summaryRating: {
    alignItems: "flex-start",
  },

  average: {
    fontSize: 32,
    fontWeight: "900",
    color: colors.root.primary,
  },

  stars: {
    flexDirection: "row",
    gap: 3,
  },

  summaryCount: {
    marginTop: 5,
    fontSize: 11,
    color: "rgba(255,255,255,0.6)",
  },

  summaryIcon: {
    width: 58,
    height: 58,
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.08)",
    alignItems: "center",
    justifyContent: "center",
  },

  section: {
    marginBottom: 20,
  },

  sectionTitle: {
    marginBottom: 10,
    fontSize: 14,
    fontWeight: "900",
    color: colors.root.secondary,
  },

  reviewList: {
    gap: 10,
    marginBottom: 70,
  },

  reviewCard: {
    backgroundColor: colors.root.primary,
    borderRadius: 18,
    padding: 15,
  },

  tripHeader: {
    flexDirection: "row",
    alignItems: "center",
  },

  tripIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#EAF7F1",
    alignItems: "center",
    justifyContent: "center",
  },

  tripInfo: {
    flex: 1,
    marginLeft: 10,
  },

  tripName: {
    fontSize: 13,
    fontWeight: "900",
    color: colors.root.secondary,
  },

  tripDate: {
    marginTop: 3,
    fontSize: 10,
    color: "#999",
  },

  reviewDate: {
    fontSize: 9,
    color: "#999",
  },

  separator: {
    height: 1,
    backgroundColor: "#EEEEEE",
    marginVertical: 12,
  },

  driver: {
    flexDirection: "row",
    alignItems: "center",
  },

  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
  },

  avatarPlaceholder: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#EEF0F2",
    alignItems: "center",
    justifyContent: "center",
  },

  driverInfo: {
    flex: 1,
    marginLeft: 10,
  },

  driverName: {
    fontSize: 12,
    fontWeight: "800",
    color: colors.root.secondary,
  },

  vehicle: {
    marginTop: 3,
    fontSize: 10,
    color: "#888",
  },

  ratingRow: {
    marginTop: 13,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  ratingNumber: {
    fontSize: 11,
    fontWeight: "800",
    color: colors.root.secondary,
  },

  comment: {
    marginTop: 9,
    fontSize: 12,
    lineHeight: 18,
    color: "#666",
  },

  pressed: {
    opacity: 0.7,
    transform: [{ scale: 0.98 }],
  },
});

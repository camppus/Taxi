import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import colors from "@/styles/color";

type ComplaintStatus = "pending" | "investigating" | "resolved" | "rejected";

type Complaint = {
  id: string;
  tripName: string;
  date: string;
  category: string;
  description: string;
  status: ComplaintStatus;
  createdAt: string;
  response?: string;
};

const mockComplaints: Complaint[] = [
  {
    id: "complaint-001",
    tripName: "Luanda → Talatona",
    date: "12 Ago 2026",
    category: "Comportamento do motorista",
    description:
      "O motorista chegou atrasado ao ponto de embarque e não avisou.",
    status: "resolved",
    createdAt: "12 Ago 2026",
    response:
      "A situação foi analisada pela nossa equipa e o motorista foi notificado.",
  },

  {
    id: "complaint-002",
    tripName: "Kilamba → Maianga",
    date: "08 Ago 2026",
    category: "Problema com a viagem",
    description: "A viagem terminou num local diferente do ponto combinado.",
    status: "investigating",
    createdAt: "08 Ago 2026",
  },

  {
    id: "complaint-003",
    tripName: "Viana → Benfica",
    date: "02 Ago 2026",
    category: "Pagamento",
    description:
      "O valor cobrado foi diferente do valor apresentado antes da reserva.",
    status: "pending",
    createdAt: "02 Ago 2026",
  },
];

export default function ComplaintsPage() {
  const router = useRouter();

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
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
          <Text style={styles.headerTitle}>Reportes e reclamações</Text>

          <Text style={styles.headerSubtitle}>
            Histórico dos casos enviados
          </Text>
        </View>

        <View style={{ width: 42 }} />
      </View>

      <View style={styles.infoCard}>
        <View style={styles.infoIcon}>
          <Ionicons
            name="shield-checkmark-outline"
            size={22}
            color={colors.root.green}
          />
        </View>

        <View style={styles.infoContent}>
          <Text style={styles.infoTitle}>Precisas de ajuda?</Text>

          <Text style={styles.infoText}>
            Envia um reporte sempre que tiveres um problema durante uma viagem.
          </Text>
        </View>
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Os meus reportes</Text>

        <Text style={styles.count}>{mockComplaints.length}</Text>
      </View>

      <View style={styles.list}>
        {mockComplaints.map((complaint) => (
          <ComplaintCard key={complaint.id} complaint={complaint} />
        ))}
      </View>

      <Pressable
        style={({ pressed }) => [
          styles.newReportButton,
          pressed && styles.pressed,
        ]}
      >
        <Ionicons
          name="add-circle-outline"
          size={19}
          color={colors.root.primary}
        />

        <Text style={styles.newReportText}>Fazer novo reporte</Text>
      </Pressable>
    </ScrollView>
  );
}

function ComplaintCard({ complaint }: { complaint: Complaint }) {
  return (
    <View style={styles.complaintCard}>
      <View style={styles.cardHeader}>
        <View style={styles.tripIcon}>
          <Ionicons name="car-outline" size={18} color={colors.root.green} />
        </View>

        <View style={styles.tripContent}>
          <Text style={styles.tripName}>{complaint.tripName}</Text>

          <Text style={styles.tripDate}>{complaint.date}</Text>
        </View>

        <StatusBadge status={complaint.status} />
      </View>

      <View style={styles.separator} />

      <View style={styles.categoryRow}>
        <Ionicons name="alert-circle-outline" size={16} color="#777" />

        <Text style={styles.category}>{complaint.category}</Text>
      </View>

      <Text style={styles.description}>{complaint.description}</Text>

      {complaint.response && (
        <View style={styles.response}>
          <View style={styles.responseHeader}>
            <Ionicons
              name="chatbubble-ellipses-outline"
              size={15}
              color={colors.root.green}
            />

            <Text style={styles.responseTitle}>Resposta do suporte</Text>
          </View>

          <Text style={styles.responseText}>{complaint.response}</Text>
        </View>
      )}

      <View style={styles.footer}>
        <Text style={styles.createdAt}>Enviado em {complaint.createdAt}</Text>

        <Ionicons name="chevron-forward" size={17} color="#A0A0A0" />
      </View>
    </View>
  );
}

function StatusBadge({ status }: { status: ComplaintStatus }) {
  const config = {
    pending: {
      label: "Pendente",
      icon: "time-outline" as const,
      background: "#FFF7E8",
      text: "#B7791F",
    },

    investigating: {
      label: "Em análise",
      icon: "search-outline" as const,
      background: "#EEF5FF",
      text: "#2563EB",
    },

    resolved: {
      label: "Resolvido",
      icon: "checkmark-circle-outline" as const,
      background: "#EAF7F1",
      text: colors.root.green,
    },

    rejected: {
      label: "Encerrado",
      icon: "close-circle-outline" as const,
      background: "#FFF0F0",
      text: "#D14343",
    },
  };

  const current = config[status];

  return (
    <View
      style={[
        styles.badge,
        {
          backgroundColor: current.background,
        },
      ]}
    >
      <Ionicons name={current.icon} size={12} color={current.text} />

      <Text
        style={[
          styles.badgeText,
          {
            color: current.text,
          },
        ]}
      >
        {current.label}
      </Text>
    </View>
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
    textAlign: "center",
    marginTop: 3,
    fontSize: 11,
    color: "#888",
  },

  infoCard: {
    backgroundColor: "#EAF7F1",
    borderRadius: 18,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },

  infoIcon: {
    width: 42,
    height: 42,
    borderRadius: 13,
    backgroundColor: "#DDF5E8",
    alignItems: "center",
    justifyContent: "center",
  },

  infoContent: {
    flex: 1,
    marginLeft: 11,
  },

  infoTitle: {
    fontSize: 13,
    fontWeight: "900",
    color: colors.root.secondary,
  },

  infoText: {
    marginTop: 3,
    fontSize: 11,
    lineHeight: 16,
    color: "#66736B",
  },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  sectionTitle: {
    fontSize: 14,
    fontWeight: "900",
    color: colors.root.secondary,
  },

  count: {
    minWidth: 25,
    height: 25,
    paddingHorizontal: 7,
    borderRadius: 13,
    backgroundColor: colors.root.secondary,
    color: colors.root.primary,
    textAlign: "center",
    lineHeight: 25,
    fontSize: 10,
    fontWeight: "900",
  },

  list: {
    gap: 10,
  },

  complaintCard: {
    backgroundColor: colors.root.primary,
    borderRadius: 18,
    padding: 15,
  },

  cardHeader: {
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

  tripContent: {
    flex: 1,
    marginLeft: 10,
    marginRight: 8,
  },

  tripName: {
    fontSize: 12,
    fontWeight: "900",
    color: colors.root.secondary,
  },

  tripDate: {
    marginTop: 3,
    fontSize: 10,
    color: "#999",
  },

  badge: {
    minHeight: 28,
    paddingHorizontal: 8,
    borderRadius: 9,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },

  badgeText: {
    fontSize: 9,
    fontWeight: "900",
  },

  separator: {
    height: 1,
    backgroundColor: "#EEEEEE",
    marginVertical: 12,
  },

  categoryRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  category: {
    fontSize: 11,
    fontWeight: "800",
    color: colors.root.secondary,
  },

  description: {
    marginTop: 8,
    fontSize: 12,
    lineHeight: 18,
    color: "#666",
  },

  response: {
    marginTop: 12,
    padding: 11,
    borderRadius: 12,
    backgroundColor: "#F7F8F8",
  },

  responseHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },

  responseTitle: {
    fontSize: 10,
    fontWeight: "900",
    color: colors.root.secondary,
  },

  responseText: {
    marginTop: 5,
    fontSize: 11,
    lineHeight: 17,
    color: "#777",
  },

  footer: {
    marginTop: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  createdAt: {
    fontSize: 9,
    color: "#A0A0A0",
  },

  newReportButton: {
    height: 50,
    borderRadius: 15,
    marginTop: 18,
    backgroundColor: colors.root.secondary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
    marginBottom: 80,
  },

  newReportText: {
    fontSize: 12,
    fontWeight: "900",
    color: colors.root.primary,
  },

  pressed: {
    opacity: 0.7,
    transform: [{ scale: 0.98 }],
  },
});

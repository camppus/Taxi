import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import { Pressable, SafeAreaView, SectionList, StyleSheet, Text, View } from "react-native";
import color from "@/styles/color";
import { UserRole } from "@/types/User";

type NotificationType = "SYSTEM" | "BOOKING" | "PAYMENT" | "TRIP" | "CHAT" | "REMINDER";
type AppNotification = { id: string; title: string; message: string; type: NotificationType; read: boolean; createdAt: string; deepLink?: string };

const DRIVER_NOTIFICATIONS: AppNotification[] = [
  { id: "driver-1", title: "Documentos em análise", message: "Recebemos os seus documentos. A verificação pode demorar até 24 horas.", type: "SYSTEM", read: false, createdAt: "Agora", deepLink: "/(driver)/verification/documents" },
  { id: "driver-2", title: "Nova reserva", message: "Ana Paula pediu 1 lugar na viagem Luanda → Talatona.", type: "BOOKING", read: false, createdAt: "Há 18 min", deepLink: "/(driver)/trips" },
  { id: "driver-3", title: "Lembrete de partida", message: "A sua viagem para Talatona parte hoje às 08:00.", type: "REMINDER", read: true, createdAt: "Hoje, 07:15", deepLink: "/(driver)/trips" },
  { id: "driver-4", title: "Pagamento recebido", message: "Recebeu 2.500 Kz pela viagem concluída.", type: "PAYMENT", read: true, createdAt: "Ontem" },
];

const PASSENGER_NOTIFICATIONS: AppNotification[] = [
  { id: "passenger-1", title: "Reserva confirmada", message: "Carlos Manuel confirmou a sua reserva para Talatona.", type: "BOOKING", read: false, createdAt: "Agora", deepLink: "/(passenger)/bookings" },
  { id: "passenger-2", title: "O motorista enviou uma mensagem", message: "Carlos: Estarei no local de partida dentro de alguns minutos.", type: "CHAT", read: false, createdAt: "Há 25 min", deepLink: "/(passenger)/conversation" },
  { id: "passenger-3", title: "Lembrete de viagem", message: "A sua viagem para Talatona começa hoje às 08:00.", type: "REMINDER", read: true, createdAt: "Hoje, 07:15", deepLink: "/(passenger)/bookings" },
  { id: "passenger-4", title: "Pagamento confirmado", message: "O pagamento de 2.500 Kz foi confirmado com sucesso.", type: "PAYMENT", read: true, createdAt: "Ontem" },
];

const iconByType: Record<NotificationType, keyof typeof Ionicons.glyphMap> = { SYSTEM: "information-circle-outline", BOOKING: "ticket-outline", PAYMENT: "wallet-outline", TRIP: "car-outline", CHAT: "chatbubble-outline", REMINDER: "time-outline" };

export default function NotificationsScreen({ userRole }: { userRole: UserRole }) {
  const router = useRouter();
  const [notifications, setNotifications] = useState(() => userRole === UserRole.DRIVER ? DRIVER_NOTIFICATIONS : PASSENGER_NOTIFICATIONS);
  const unread = notifications.filter((notification) => !notification.read).length;
  const sections = useMemo(() => [{ title: unread ? "Não lidas" : "Tudo em dia", data: notifications.filter((notification) => !notification.read) }, { title: "Anteriores", data: notifications.filter((notification) => notification.read) }].filter((section) => section.data.length), [notifications, unread]);

  const openNotification = (notification: AppNotification) => {
    setNotifications((current) => current.map((item) => item.id === notification.id ? { ...item, read: true } : item));
    if (notification.deepLink) router.push(notification.deepLink as any);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <View><Text style={styles.title}>Notificações</Text><Text style={styles.subtitle}>{unread ? `${unread} não lida${unread > 1 ? "s" : ""}` : "Está tudo em dia"}</Text></View>
        {unread > 0 && <Pressable onPress={() => setNotifications((current) => current.map((notification) => ({ ...notification, read: true })))} style={styles.readAll}><Text style={styles.readAllText}>Marcar como lidas</Text></Pressable>}
      </View>
      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        stickySectionHeadersEnabled={false}
        renderSectionHeader={({ section }) => <Text style={styles.sectionTitle}>{section.title}</Text>}
        renderItem={({ item }) => <Pressable onPress={() => openNotification(item)} style={[styles.item, !item.read && styles.itemUnread]}><View style={[styles.iconBox, !item.read && styles.iconBoxUnread]}><Ionicons name={iconByType[item.type]} size={20} color={!item.read ? color.root.green : "#737373"} /></View><View style={styles.itemContent}><View style={styles.itemTop}><Text style={styles.itemTitle}>{item.title}</Text><Text style={styles.time}>{item.createdAt}</Text></View><Text style={styles.message}>{item.message}</Text>{item.deepLink && <View style={styles.actionHint}><Text style={styles.actionHintText}>Ver detalhes</Text><Ionicons name="arrow-forward" size={13} color={color.root.green} /></View>}</View>{!item.read && <View style={styles.unreadDot} />}</Pressable>}
        ListEmptyComponent={<View style={styles.empty}><Ionicons name="notifications-off-outline" size={46} color="#C7C7CC" /><Text style={styles.emptyTitle}>Sem notificações</Text><Text style={styles.emptyText}>As atualizações da sua conta e viagens aparecerão aqui.</Text></View>}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#fff" }, header: { paddingHorizontal: 20, paddingTop: 13, paddingBottom: 18, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }, title: { fontSize: 24, fontWeight: "800", color: color.root.secondary }, subtitle: { marginTop: 3, color: "#737373", fontSize: 12 }, readAll: { paddingVertical: 8, paddingLeft: 12 }, readAllText: { color: color.root.green, fontWeight: "800", fontSize: 12 }, list: { paddingHorizontal: 16, paddingBottom: 110 }, sectionTitle: { marginTop: 12, marginBottom: 8, fontSize: 12, fontWeight: "800", color: "#737373", textTransform: "uppercase", letterSpacing: 0.6 }, item: { flexDirection: "row", alignItems: "flex-start", borderRadius: 17, padding: 13, backgroundColor: "#fff", borderWidth: 1, borderColor: "#EEEEEE", marginBottom: 8 }, itemUnread: { backgroundColor: "#F5FBF7", borderColor: "#DDEFE2" }, iconBox: { width: 42, height: 42, borderRadius: 13, alignItems: "center", justifyContent: "center", backgroundColor: "#F1F1F1", marginRight: 11 }, iconBoxUnread: { backgroundColor: "#E7F7EC" }, itemContent: { flex: 1, paddingRight: 4 }, itemTop: { flexDirection: "row", gap: 8, alignItems: "baseline" }, itemTitle: { flex: 1, color: color.root.secondary, fontSize: 13, fontWeight: "800" }, time: { color: "#8E8E93", fontSize: 10 }, message: { color: "#686868", fontSize: 12, lineHeight: 17, marginTop: 4 }, actionHint: { flexDirection: "row", gap: 4, alignItems: "center", marginTop: 8 }, actionHintText: { color: color.root.green, fontWeight: "800", fontSize: 11 }, unreadDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: color.root.green, marginTop: 4 }, empty: { alignItems: "center", paddingTop: 85, paddingHorizontal: 42 }, emptyTitle: { marginTop: 13, color: color.root.secondary, fontSize: 17, fontWeight: "800" }, emptyText: { textAlign: "center", color: "#737373", fontSize: 13, lineHeight: 19, marginTop: 5 },
});

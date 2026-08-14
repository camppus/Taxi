import React from "react";
import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import Conversation from "../types/Conversation";
import { formatConversationTime } from "@/util/date";
import color from "@/styles/color";
import { getInitials } from "@/util/lib";

interface Props {
  conversation: Conversation;
  onPress: (conversation: Conversation) => void;
}

export default function ConversationListItem({ conversation, onPress }: Props) {
  const { trip, lastMessage } = conversation;

  const isUnread = !lastMessage.isMe && !lastMessage.isRead;

  return (
    <Pressable
      onPress={() => onPress(conversation)}
      style={({ pressed }) => [styles.container, pressed && styles.pressed]}
    >
      {trip.driver.photoUrl ? (
        <Image source={{ uri: trip.driver.photoUrl }} style={styles.avatar} />
      ) : (
        <View style={styles.avatarPlaceholder}>
          <Text style={styles.avatarPlaceholderText}>
            {getInitials(trip.driver.fullName)}
          </Text>
        </View>
      )}

      <View style={styles.content}>
        <View style={styles.topRow}>
          <Text
            style={[styles.name, isUnread && styles.nameUnread]}
            numberOfLines={1}
          >
            {trip.driver.fullName}
          </Text>
          <Text style={[styles.time, isUnread && styles.timeUnread]}>
            {formatConversationTime(lastMessage.sentAt)}
          </Text>
        </View>

        <View style={styles.bottomRow}>
          <Text
            style={[styles.message, isUnread && styles.messageUnread]}
            numberOfLines={1}
          >
            {lastMessage.isMe ? "Você: " : ""}
            {lastMessage.message}
          </Text>

          {isUnread && <View style={styles.unreadDot} />}
        </View>

        <Text style={styles.tripInfo} numberOfLines={1}>
          {trip.vehicle.brand} {trip.vehicle.model} · {trip.vehicle.plateNumber}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  pressed: {
    backgroundColor: "#F5F5F7",
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "#E5E5EA",
    marginRight: 12,
  },
  content: {
    flex: 1,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  name: {
    fontSize: 16,
    fontWeight: "500",
    color: "#1C1C1E",
    flex: 1,
    marginRight: 8,
  },
  nameUnread: {
    fontWeight: "700",
  },
  time: {
    fontSize: 12,
    color: "#8E8E93",
  },
  timeUnread: {
    color: color.root.green,
    fontWeight: "600",
  },
  bottomRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 2,
  },
  message: {
    fontSize: 14,
    color: "#8E8E93",
    flex: 1,
    marginRight: 8,
  },
  messageUnread: {
    color: "#1C1C1E",
    fontWeight: "600",
  },
  unreadDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: color.root.green,
  },
  tripInfo: {
    fontSize: 12,
    color: "#AEAEB2",
    marginTop: 2,
  },

  avatarPlaceholder: {
    width: 48,
    height: 48,
    borderRadius: 26,
    backgroundColor: "#E5E7EB",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },

  avatarPlaceholderText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#374151",
  },
});

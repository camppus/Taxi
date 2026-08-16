import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  SafeAreaView,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Conversation from "@/types/Conversation";
import { mockConversations } from "@/mocks/mockConversations";
import ConversationListItem from "@/components/ConversationListItem";
import color from "@/styles/color";
export default function ConversationsScreen() {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const conversations: Conversation[] = mockConversations;

  const sorted = useMemo(() => {
    return [...conversations]
      .filter((c) =>
        c.trip.driver.fullName.toLowerCase().includes(search.toLowerCase()),
      )
      .sort(
        (a, b) =>
          new Date(b.lastMessage.sentAt).getTime() -
          new Date(a.lastMessage.sentAt).getTime(),
      );
  }, [conversations, search]);

  const unreadCount = conversations.filter(
    (c) => !c.lastMessage.isMe && !c.lastMessage.isRead,
  ).length;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.title}>Conversas</Text>
        {unreadCount > 0 && (
          <View style={styles.headerBadge}>
            <Text style={styles.headerBadgeText}>{unreadCount}</Text>
          </View>
        )}
      </View>

      <View style={styles.searchContainer}>
        <Ionicons name="search" size={18} color="#8E8E93" />
        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder="Pesquisar conversas"
          placeholderTextColor="#8E8E93"
          style={styles.searchInput}
        />
      </View>

      <FlatList
        data={sorted}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ConversationListItem
            conversation={item}
            onPress={(conversation) =>
              router.push(`/(driver)/conversation/${conversation.id}`)
            }
          />
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        contentContainerStyle={
          sorted.length === 0 ? styles.emptyContainer : undefined
        }
        ListEmptyComponent={
          <View style={styles.empty}>
            <Ionicons
              name="chatbubble-ellipses-outline"
              size={48}
              color="#C7C7CC"
            />
            <Text style={styles.emptyText}>Nenhuma conversa encontrada</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1C1C1E",
  },
  headerBadge: {
    marginLeft: 8,
    backgroundColor: color.root.green,
    borderRadius: 10,
    paddingHorizontal: 7,
    paddingVertical: 2,
    minWidth: 20,
    alignItems: "center",
  },
  headerBadgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "700",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F2F2F7",
    borderRadius: 10,
    marginHorizontal: 16,
    marginBottom: 8,
    paddingHorizontal: 10,
    height: 38,
  },
  searchInput: {
    flex: 1,
    marginLeft: 6,
    fontSize: 15,
    color: "#1C1C1E",
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "#E5E5EA",
    marginLeft: 80,
  },
  emptyContainer: {
    flexGrow: 1,
  },
  empty: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 80,
  },
  emptyText: {
    marginTop: 12,
    color: "#8E8E93",
    fontSize: 15,
  },
});

import React, { useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import { useLocalSearchParams, useRouter, Stack } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location";
import ChatBubble from "@/components/Chatbubble";
import { ConvrsationMessage } from "@/types/Conversation";
import { encodeLocationMessage } from "@/util/location";
import { mockConversations } from "@/mocks/mockConversations";
import { mockMessagesByConversation } from "@/mocks/mockConversationMessages";
import color from "@/styles/color";
import { getInitials } from "@/util/lib";
import { BlurView } from "expo-blur";

const CURRENT_USER = { id: "me", name: "Você" };

export default function ConversationDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const listRef = useRef<FlatList>(null);
  const conversation = mockConversations[0];
  const [messages, setMessages] = useState<ConvrsationMessage[]>(
    mockMessagesByConversation,
  );
  const [draft, setDraft] = useState("");
  const [sendingLocation, setSendingLocation] = useState(false);

  if (!conversation) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <Text style={styles.notFound}>Conversa não encontrada</Text>
      </SafeAreaView>
    );
  }

  const { trip } = conversation;
  const scrollToBottom = () => {
    requestAnimationFrame(() => {
      listRef.current?.scrollToEnd({
        animated: true,
      });

      setTimeout(() => {
        listRef.current?.scrollToEnd({
          animated: true,
        });
      }, 100);
    });
  };

  function handleSend() {
    if (!draft.trim()) return;

    const newMessage: ConvrsationMessage = {
      id: Math.random().toString(36).slice(2),
      message: draft.trim(),
      senderId: CURRENT_USER.id,
      sender: { id: CURRENT_USER.id, name: CURRENT_USER.name },
      sendAt: new Date(),
      isMe: true,
      isRead: false,
    };
    setMessages((prev) => [...prev, newMessage]);
    setDraft("");
    scrollToBottom();
  }

  async function handleSendLocation() {
    if (sendingLocation) return;
    setSendingLocation(true);

    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") return;

      const position = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      const newMessage: ConvrsationMessage = {
        id: Math.random().toString(36).slice(2),
        message: encodeLocationMessage({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          name: "",
        }),
        senderId: CURRENT_USER.id,
        sender: { id: CURRENT_USER.id, name: CURRENT_USER.name },
        sendAt: new Date(),
        isMe: true,
        isRead: true,
      };

      setMessages((prev) => [...prev, newMessage]);
    } finally {
      setSendingLocation(false);
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <Stack.Screen options={{ headerShown: false }} />

      <View style={styles.header}>
        {trip.driver.photoUrl ? (
          <Image source={{ uri: trip.driver.photoUrl }} style={styles.avatar} />
        ) : (
          <View style={styles.avatarPlaceholder}>
            <Text style={styles.avatarPlaceholderText}>
              {getInitials(trip.driver.fullName)}
            </Text>
          </View>
        )}

        <View style={styles.headerInfo}>
          <Text style={styles.headerName} numberOfLines={1}>
            {trip.driver.fullName}
          </Text>
          <Text style={styles.headerTrip} numberOfLines={1}>
            {trip.vehicle.brand} {trip.vehicle.model} ·{" "}
            {trip.vehicle.plateNumber}
          </Text>
        </View>

        <View style={styles.headerActions}>
          <Pressable hitSlop={12}>
            <Ionicons name="call-outline" size={22} color={color.root.green} />
          </Pressable>

          <Pressable onPress={() => router.back()} hitSlop={12}>
            <Ionicons name="chevron-back" size={26} color={"gray"} />
          </Pressable>
        </View>
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={90}
      >
        <FlatList
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <ChatBubble {...item} />}
          contentContainerStyle={styles.messagesList}
          inverted={false}
          ref={listRef}
          onContentSizeChange={() => {
            scrollToBottom();
          }}
        />

        <BlurView intensity={70} tint="light" style={styles.inputBar}>
          <TextInput
            value={draft}
            onChangeText={setDraft}
            placeholder="Mensagem"
            placeholderTextColor="#8E8E93"
            style={styles.input}
            multiline
          />
          <Pressable
            onPress={handleSend}
            disabled={!draft.trim()}
            style={[
              styles.sendButton,
              !draft.trim() && styles.sendButtonDisabled,
            ]}
          >
            <Ionicons name="arrow-up" size={18} color="#fff" />
          </Pressable>
          <Pressable
            onPress={handleSendLocation}
            disabled={sendingLocation}
            style={[
              styles.sendButton,
              {
                backgroundColor: color.root.green,
                marginLeft: 3,
              },
            ]}
          >
            {sendingLocation ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Ionicons name="pin-outline" size={18} color="#fff" />
            )}
          </Pressable>
        </BlurView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  notFound: {
    textAlign: "center",
    marginTop: 40,
    color: "#8E8E93",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#E5E5EA",
  },
  backButton: {
    marginRight: 4,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#E5E5EA",
    marginRight: 10,
  },
  headerInfo: {
    flex: 1,
  },
  headerName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1C1C1E",
  },
  headerTrip: {
    fontSize: 12,
    color: "#8E8E93",
  },
  headerActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  messagesList: {
    paddingVertical: 12,
    flexGrow: 1,
  },

  inputBar: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginHorizontal: 12,
    marginBottom: 70,
    padding: 7,
    paddingLeft: 14,
    borderRadius: 24,
    overflow: "hidden",
    backgroundColor: "rgba(255,255,255,0.72)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.5)",
  },

  input: {
    flex: 1,
    backgroundColor: "#F2F2F7",
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
    maxHeight: 100,
    fontSize: 15,
    color: "#1C1C1E",
    marginRight: 8,
  },
  sendButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: color.root.green,
    alignItems: "center",
    justifyContent: "center",
  },
  sendButtonDisabled: {
    backgroundColor: "#C7C7CC",
  },
});

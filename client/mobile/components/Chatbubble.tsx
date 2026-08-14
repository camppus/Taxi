import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from "react-native-maps";
import { Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location";

import { formatMessageTime } from "@/util/date";
import { ConvrsationMessage } from "@/types/Conversation";
import { parseLocationMessage } from "@/util/location";
import { getInitials } from "@/util/lib";
import color from "@/styles/color";

export default function ChatBubble({
  message,
  sender,
  sendAt,
  isMe,
  isRead,
}: ConvrsationMessage) {
  const location = parseLocationMessage(message);

  if (location) {
    return (
      <LocationMessage
        location={{
          lat: location.latitude,
          long: location.longitude,
        }}
        sender={sender}
        sendAt={sendAt}
        isMe={isMe}
        isRead={isRead}
      />
    );
  }

  return (
    <View style={[styles.row, isMe ? styles.rowMe : styles.rowOther]}>
      {!isMe &&
        (sender.image ? (
          <Image source={{ uri: sender.image }} style={styles.avatar} />
        ) : (
          <View style={styles.avatarPlaceholder}>
            <Text style={styles.avatarPlaceholderText}>
              {getInitials(sender.name)}
            </Text>
          </View>
        ))}

      <View
        style={[styles.bubble, isMe ? styles.bubbleMe : styles.bubbleOther]}
      >
        <Text style={[styles.text, isMe && styles.textMe]}>{message}</Text>

        <View style={styles.footer}>
          <Text style={[styles.time, isMe && styles.timeMe]}>
            {formatMessageTime(sendAt)}
          </Text>

          {isMe && (
            <Ionicons
              name={isRead ? "checkmark-done" : "checkmark"}
              size={14}
              color={isRead ? color.root.primary : "rgba(255,255,255,0.7)"}
              style={{ marginLeft: 4 }}
            />
          )}
        </View>
      </View>
    </View>
  );
}

function LocationMessage({
  location,
  sender,
  sendAt,
  isMe,
  isRead,
}: {
  location: {
    lat: number;
    long: number;
  };
  sender: {
    name: string;
    id: string;
    image?: string;
  };
  sendAt: Date;
  isMe: boolean;
  isRead: boolean;
}) {
  const [myPosition, setMyPosition] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  useEffect(() => {
    if (isMe) return;

    let cancelled = false;

    async function getLocation() {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== "granted") return;

        const position = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced,
        });

        if (cancelled) return;

        setMyPosition({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      } catch {
        // Não interromper o chat caso a localização falhe.
      }
    }

    getLocation();

    return () => {
      cancelled = true;
    };
  }, [isMe]);

  const sentLocation = {
    latitude: location.lat,
    longitude: location.long,
  };

  const hasRoute = !isMe && myPosition !== null;

  const centerLatitude = hasRoute
    ? (sentLocation.latitude + myPosition!.latitude) / 2
    : sentLocation.latitude;

  const centerLongitude = hasRoute
    ? (sentLocation.longitude + myPosition!.longitude) / 2
    : sentLocation.longitude;

  const latitudeDelta = hasRoute
    ? Math.max(
        Math.abs(sentLocation.latitude - myPosition!.latitude) * 2.2,
        0.008,
      )
    : 0.008;

  const longitudeDelta = hasRoute
    ? Math.max(
        Math.abs(sentLocation.longitude - myPosition!.longitude) * 2.2,
        0.008,
      )
    : 0.008;

  return (
    <View
      style={[
        styles.locationRow,
        isMe ? styles.locationRowMe : styles.locationRowOther,
      ]}
    >
      {!isMe && (
        <View style={styles.locationAvatarWrapper}>
          {sender.image ? (
            <Image
              source={{ uri: sender.image }}
              style={styles.locationAvatar}
            />
          ) : (
            <View style={styles.locationAvatarPlaceholder}>
              <Text style={styles.locationAvatarPlaceholderText}>
                {getInitials(sender.name)}
              </Text>
            </View>
          )}
        </View>
      )}

      <View
        style={[
          styles.locationBubble,
          isMe ? styles.locationBubbleMe : styles.locationBubbleOther,
        ]}
      >
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.locationMap}
          region={{
            latitude: centerLatitude,
            longitude: centerLongitude,
            latitudeDelta,
            longitudeDelta,
          }}
          scrollEnabled={false}
          zoomEnabled={false}
          rotateEnabled={false}
          pitchEnabled={false}
          toolbarEnabled={false}
          moveOnMarkerPress={false}
          loadingEnabled
          showsCompass={false}
          showsScale={false}
          showsTraffic={false}
          showsBuildings
          showsIndoors
          showsPointsOfInterest
        >
          {/* Localização enviada */}
          <Marker
            coordinate={sentLocation}
            title={isMe ? "A minha localização" : sender.name}
            description="Localização partilhada"
          >
            <View
              style={[
                styles.marker,
                isMe ? styles.markerMe : styles.markerOther,
              ]}
            >
              <Ionicons name="location" size={18} color="#fff" />
            </View>
          </Marker>

          {/* Minha localização quando recebo */}
          {hasRoute && (
            <>
              <Marker coordinate={myPosition!} title="A tua localização">
                <View style={styles.myMarker}>
                  <View style={styles.myMarkerDot} />
                </View>
              </Marker>

              <Polyline
                coordinates={[myPosition!, sentLocation]}
                strokeColor={color.root.green}
                strokeWidth={4}
                lineDashPattern={[0]}
              />
            </>
          )}
        </MapView>

        <View style={styles.locationBottom}>
          <View style={styles.locationLabel}>
            <Ionicons
              name="location-outline"
              size={16}
              color={isMe ? color.root.green : color.root.secondary}
            />

            <Text
              style={[styles.locationTitle, isMe && styles.locationTitleMe]}
              numberOfLines={1}
            >
              {isMe ? "Localização partilhada" : "Localização recebida"}
            </Text>
          </View>

          <View style={styles.locationFooter}>
            <Text style={[styles.locationTime, isMe && styles.locationTimeMe]}>
              {formatMessageTime(sendAt)}
            </Text>

            {isMe && (
              <Ionicons
                name={isRead ? "checkmark-done" : "checkmark"}
                size={14}
                color={isRead ? color.root.green : "#9CA3AF"}
                style={{ marginLeft: 4 }}
              />
            )}
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginVertical: 3,
    paddingHorizontal: 12,
  },

  rowMe: {
    justifyContent: "flex-end",
  },

  rowOther: {
    justifyContent: "flex-start",
  },

  avatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#E5E5EA",
    marginRight: 6,
    marginBottom: 2,
  },

  avatarPlaceholder: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#E5E7EB",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 6,
    marginBottom: 2,
  },

  avatarPlaceholderText: {
    fontSize: 10,
    fontWeight: "600",
    color: "#374151",
  },

  bubble: {
    maxWidth: "76%",
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },

  bubbleMe: {
    backgroundColor: color.root.green,
    borderBottomRightRadius: 4,
  },

  bubbleOther: {
    backgroundColor: "#F2F2F7",
    borderBottomLeftRadius: 4,
  },

  text: {
    fontSize: 15,
    color: "#1C1C1E",
  },

  textMe: {
    color: "#fff",
  },

  footer: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-end",
    marginTop: 4,
  },

  time: {
    fontSize: 10,
    color: "#8E8E93",
  },

  timeMe: {
    color: "rgba(255,255,255,0.7)",
  },

  // LOCATION

  locationRow: {
    width: "100%",
    flexDirection: "row",
    alignItems: "flex-end",
    paddingHorizontal: 12,
    marginVertical: 5,
  },

  locationRowMe: {
    justifyContent: "flex-end",
  },

  locationRowOther: {
    justifyContent: "flex-start",
  },

  locationAvatarWrapper: {
    marginRight: 7,
    marginBottom: 4,
  },

  locationAvatar: {
    width: 26,
    height: 26,
    borderRadius: 13,
  },

  locationAvatarPlaceholder: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: "#E5E7EB",
    alignItems: "center",
    justifyContent: "center",
  },

  locationAvatarPlaceholderText: {
    fontSize: 10,
    fontWeight: "700",
    color: "#374151",
  },

  locationBubble: {
    width: "76%",
    borderRadius: 18,
    overflow: "hidden",
  },

  locationBubbleMe: {
    backgroundColor: color.root.primary,
    borderBottomRightRadius: 5,
  },

  locationBubbleOther: {
    backgroundColor: "#F2F2F7",
    borderBottomLeftRadius: 5,
  },

  locationMap: {
    width: "100%",
    height: 190,
  },

  locationBottom: {
    paddingHorizontal: 12,
    paddingVertical: 9,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  locationLabel: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginRight: 8,
  },

  locationTitle: {
    marginLeft: 5,
    fontSize: 13,
    fontWeight: "700",
    color: color.root.secondary,
  },

  locationTitleMe: {
    color: color.root.secondary,
  },

  locationFooter: {
    flexDirection: "row",
    alignItems: "center",
  },

  locationTime: {
    fontSize: 10,
    color: "#8E8E93",
  },

  locationTimeMe: {
    color: "#8E8E93",
  },

  marker: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: "#fff",
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },

  markerMe: {
    backgroundColor: color.root.green,
  },

  markerOther: {
    backgroundColor: "#111827",
  },

  myMarker: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: "rgba(10,132,255,0.22)",
    alignItems: "center",
    justifyContent: "center",
  },

  myMarkerDot: {
    width: 11,
    height: 11,
    borderRadius: 6,
    backgroundColor: "#0A84FF",
    borderWidth: 2,
    borderColor: "#fff",
  },
});

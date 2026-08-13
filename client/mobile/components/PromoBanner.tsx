import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

type PromoBannerProps = {
  title: string;
  subtitle: string;
  onPress?: () => void;
};

export default function PromoBanner({
  title,
  subtitle,
  onPress,
}: PromoBannerProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      style={styles.wrapper}
    >
      <LinearGradient
        colors={["#0FA85A", "#17C96B", "#3EE38A"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <View style={styles.circleTopRight} />
        <View style={styles.circleBottomLeft} />

        <View style={styles.content}>
          <View style={styles.textColumn}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.subtitle}>{subtitle}</Text>
          </View>

          <View style={styles.illustration}>
            <View style={styles.driverBadge}>
              <MaterialCommunityIcons name="moped" size={30} color="#0FA85A" />
            </View>

            <View style={styles.boxBadge}>
              <Ionicons name="cube" size={22} color="#0FA85A" />
              <View style={styles.boxArrow}>
                <Ionicons name="arrow-up" size={12} color="#FFFFFF" />
              </View>
            </View>
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 22,
    overflow: "hidden",
    elevation: 6,
    shadowColor: "#0FA85A",
    shadowOpacity: 0.25,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
  },
  gradient: {
    minHeight: 150,
    paddingHorizontal: 20,
    paddingVertical: 22,
    overflow: "hidden",
  },
  circleTopRight: {
    position: "absolute",
    top: -40,
    right: -30,
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: "rgba(255,255,255,0.12)",
  },
  circleBottomLeft: {
    position: "absolute",
    bottom: -50,
    left: -40,
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: "rgba(255,255,255,0.08)",
  },
  content: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  textColumn: { flex: 1, paddingRight: 10 },
  title: {
    fontSize: 21,
    fontWeight: "900",
    color: "#FFFFFF",
    lineHeight: 25,
  },
  subtitle: {
    fontSize: 13,
    fontWeight: "600",
    color: "rgba(255,255,255,0.9)",
    marginTop: 8,
    lineHeight: 18,
  },
  illustration: {
    width: 96,
    height: 96,
    alignItems: "center",
    justifyContent: "center",
  },
  driverBadge: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  boxBadge: {
    position: "absolute",
    bottom: -6,
    right: -6,
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  boxArrow: {
    position: "absolute",
    top: -4,
    right: -4,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: "#0FA85A",
    alignItems: "center",
    justifyContent: "center",
  },
});

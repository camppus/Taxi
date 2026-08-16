import { Slot } from "expo-router";
import { StatusBar, StyleSheet, View, LogBox } from "react-native";

LogBox.ignoreLogs([
  "VirtualizedLists should never be nested inside plain ScrollViews",
]);

export default function TabsLayout() {
  return (
    <View style={styles.safeArea}>
      <StatusBar animated barStyle={"dark-content"} />
      <Slot initialRouteName="index" />
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "white",
    height: "100%",
  },

  container: {
    flex: 1,
  },

  content: {
    flex: 1,
  },
});

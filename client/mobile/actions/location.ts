import * as Location from "expo-location";

export async function getLocation() {
  const { status } = await Location.requestForegroundPermissionsAsync();

  if (status !== "granted") {
    console.log("Permissão de localização negada");
    return;
  }

  const location = await Location.getCurrentPositionAsync({
    accuracy: Location.Accuracy.High,
  });

  console.log("Latitude:", location.coords.latitude);
  console.log("Longitude:", location.coords.longitude);
}

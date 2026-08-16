import { LatLng } from "react-native-maps";

export interface LocationPayload {
  type: "location";
  name: string;
  latitude: number;
  longitude: number;
}

export function encodeLocationMessage(
  payload: Omit<LocationPayload, "type">,
): string {
  return JSON.stringify({ type: "location", ...payload });
}

/**
 * Tenta interpretar `message` como um JSON de localização.
 * Retorna null se for uma mensagem de texto normal.
 */
export function parseLocationMessage(message: string): LocationPayload | null {
  if (!message || message[0] !== "{") return null;

  try {
    const parsed = JSON.parse(message);
    if (
      parsed &&
      parsed.type === "location" &&
      typeof parsed.latitude === "number" &&
      typeof parsed.longitude === "number" &&
      typeof parsed.name === "string"
    ) {
      return parsed as LocationPayload;
    }
    return null;
  } catch {
    return null;
  }
}


export const reverseGeocode = async (coords: LatLng): Promise<string | null> => {
  try {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${coords.latitude}&lon=${coords.longitude}&zoom=16&addressdetails=1`;
    const response = await fetch(url, { headers: { "Accept-Language": "pt" } });
    const data = await response.json();
    const address = data?.address;
    return (
      address?.suburb ||
      address?.neighbourhood ||
      address?.city_district ||
      address?.town ||
      address?.city ||
      address?.road ||
      data?.display_name ||
      null
    );
  } catch (error) {
    console.log("Erro no reverse geocode:", error);
    return null;
  }
};
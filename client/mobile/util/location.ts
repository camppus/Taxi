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

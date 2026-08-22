export interface UserLocation {
  id: string;
  userId: string;
  latitude: number;
  longitude: number;
  heading: number | null;
  speed: number | null;
  metadata: Record<string, unknown> | null;
  createdAt: string;
}

// ==========================
// Location (endereço/ponto geográfico)
// ==========================

export interface Location {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  description: string | null;
  accuracy: number | null;
  formattedAddress: string | null;
  externalId: string | null;
  street: string;
  neighborhood: string;
  city: string;
  province: string;
  country: string;
  createdAt: string;
}

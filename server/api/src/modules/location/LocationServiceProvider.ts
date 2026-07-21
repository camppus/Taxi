export interface LocationServiceProvider {
  reverseGeocode(
    latitude: number,
    longitude: number,
  ): Promise<LocationResponse>;
  geocode(query: string): Promise<LocationResponse>;
}

export interface LocationResponse {
  name: string;
  formattedAddress: string;
  latitude: number;
  longitude: number;
  street?: string;
  neighborhood?: string;
  city?: string;
  municipality?: string;
  province?: string;
  country?: string;
  osmId?: string;
  osmType?: string;
  placeType?: string;
  placeClass?: string;
  importance?: number;
}

import { Injectable } from "@nestjs/common";
import {
  LocationServiceProvider,
  LocationResponse,
} from "../LocationServiceProvider";

@Injectable()
export default class NominatimLocationProvider implements LocationServiceProvider {
  async reverseGeocode(
    latitude: number,
    longitude: number,
  ): Promise<LocationResponse> {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`,
      {
        headers: {
          "User-Agent": "SharedMobilityPlatform/1.0",
        },
      },
    );

    if (!response.ok) {
      throw new Error("Não foi possível obter localização");
    }

    const data = await response.json();

    return this.parseLocation(data, latitude, longitude);
  }

  async geocode(query: string): Promise<LocationResponse> {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
        query,
      )}&format=json&limit=1`,
      {
        headers: {
          "User-Agent": "SharedMobilityPlatform/1.0",
        },
      },
    );

    if (!response.ok) {
      throw new Error("Não foi possível pesquisar localização");
    }

    const data = await response.json();

    if (!data || data.length === 0) {
      throw new Error("Localização não encontrada");
    }

    const location = data[0];

    return this.parseLocation(
      location,
      Number(location.lat),
      Number(location.lon),
    );
  }

  private parseLocation(
    data: any,
    latitude: number,
    longitude: number,
  ): LocationResponse {
    const address = data.address ?? {};

    return {
      name: data.name ?? address.amenity ?? address.road ?? data.display_name,

      formattedAddress: data.display_name,

      latitude,

      longitude,

      street: address.road,

      neighborhood: address.suburb ?? address.neighbourhood,

      city: address.city ?? address.town ?? address.village,

      municipality: address.county,

      province: address.state,

      country: address.country,

      osmId: String(data.osm_id),

      osmType: data.osm_type,

      placeType: data.type,

      placeClass: data.class,

      importance: data.importance,
    };
  }
}

import { Driver, Vehicle } from "./Driver";

export enum TripStatus {
  DRAFT = "DRAFT",
  PUBLISHED = "PUBLISHED",
  AVAILABLE = "AVAILABLE",
  FULL = "FULL",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
}

export enum StopType {
  PICK = "PICK",
  DROP = "DROP",
}

export interface Trip {
  id: string;
  driverId: string;
  driver?: Driver;
  vehicleId: string;
  vehicle?: Vehicle;
  name: string | null;
  originId: string;
  origin?: Location;
  destinationId: string;
  destination?: Location;
  distanceKm: number | null;
  estimatedMinutes: number | null;
  departureDate: string;
  publishedSeats: number;
  priceBase: string;
  status: TripStatus;
  stops?: TripStop[];
  bookings?: Booking[];
  createdAt: string;
  updatedAt: string;
}

export interface TripStop {
  id: string;
  tripId: string;
  bookingId: string;
  locationId: string;
  location?: Location;
  order: number;
  type: StopType;
  distanceFromStart: number | null;
  createdAt: string;
}

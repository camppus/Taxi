import { Gender } from "./Gender";

export type BookingStatus =
  | "PENDING"
  | "PENDING_PAYMENT"
  | "AWAITING_CONFIRMATION"
  | "CONFIRMED"
  | "REJECTED"
  | "CANCELLED"
  | "IN_TRIP"
  | "COMPLETED";

export type PaymentStatus =
  | "PENDING"
  | "PROCESSING"
  | "PAID"
  | "FAILED"
  | "CANCELLED"
  | "REFUNDED";

export type StopType = "PICK" | "DROP";

export type RatingTarget = "DRIVER" | "PASSENGER";

export type ReportStatus = "PENDING" | "REVIEWING" | "RESOLVED" | "REJECTED";

export type ReportType =
  | "USER_BEHAVIOR"
  | "TRIP_PROBLEM"
  | "DRIVER_ISSUE"
  | "PASSENGER_ISSUE"
  | "VEHICLE_ISSUE"
  | "PAYMENT_ISSUE"
  | "FRAUD"
  | "SAFETY"
  | "OTHER";

/* =========================
   LOCATION
========================= */

export interface BookingLocation {
  id: string;
  name: string;
  latitude: number;
  longitude: number;

  description?: string;
  formattedAddress?: string;
  externalId?: string;

  street: string;
  neighborhood: string;
  city: string;
  province: string;
  country: string;
}

/* =========================
   STOP
========================= */

export interface BookingStop {
  id: string;
  locationId: string;
  location: BookingLocation;

  order: number;

  type: StopType;

  distanceFromStart?: number;

  createdAt: string;
}

/**
 * Sempre exatamente 2:
 *
 * [0] PICK
 * [1] DROP
 */
export type BookingStops = [BookingStop, BookingStop];

/* =========================
   DRIVER
========================= */

export interface BookingDriver {
  id: string;

  user: {
    id: string;
    fullName: string;
    phone: string;
    gender: Gender;
    birthDate: string;
    photoUrl?: string;
    emergencyPhone?: string;
  };

  licenseCategory?: string;
  licenseNumber: string;

  status: "ONLINE" | "OFFLINE" | "SUSPENDED" | "INACTIVE";
}


export interface BookingVehicle {
  id: string;

  name: string;
  capacity: number;
  description?: string;

  brand: string;
  model: string;
  year: number;
  color: string;

  plateNumber: string;

  totalSeats: number;
  passengerSeats: number;
}

export interface BookingTrip {
  id: string;
  name?: string;
  distanceKm?: number;
  estimatedMinutes?: number;
  departureDate: string;
  publishedSeats: number;
  priceBase: number;
  status:
    | "DRAFT"
    | "PUBLISHED"
    | "AVAILABLE"
    | "FULL"
    | "IN_PROGRESS"
    | "COMPLETED"
    | "CANCELLED";
  driver: BookingDriver;
  vehicle: BookingVehicle;
}

/* =========================
   PASSENGER
========================= */

export interface BookingPassenger {
  id: string;

  fullName: string;
  phone: string;
  gender: Gender;
  birthDate: string;

  photoUrl?: string;
  emergencyPhone?: string;
}

export interface BookingRating {
  id: string;

  fromUserId: string;
  toUserId: string;

  target: RatingTarget;

  stars: number;

  comment?: string;

  createdAt: string;
}

export interface BookingReport {
  id: string;

  reporterId: string;
  targetUserId: string;
  bookingId: string;

  type: ReportType;

  title: string;
  description: string;

  status: ReportStatus;

  createdAt: string;
  updatedAt: string;
}


export interface BookingPayment {
  id: string;

  amount: number;

  method: string;

  transactionId?: string;

  status: PaymentStatus;

  paidAt?: string;

  createdAt: string;
  updatedAt: string;
}

export interface Booking {
  id: string;

  tripId: string;
  passengerId: string;

  trip: BookingTrip;

  passenger: BookingPassenger;

  seats: number;

  price: number;

  status: BookingStatus;

  payment?: BookingPayment;

  rating: BookingRating[];

  Report: BookingReport[];

  /**
   * Sempre:
   * [0] = PICK
   * [1] = DROP
   */
  tripStop: BookingStops;

  createdAt: string;
  updatedAt: string;
}

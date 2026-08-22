import { Conversation } from "./chat";
import { Payment } from "./payment";
import { Rating } from "./rate";
import { Trip, TripStop } from "./trip";
import { User } from "./User";

export enum BookingStatus {
  PENDING = "PENDING",
  PENDING_PAYMENT = "PENDING_PAYMENT",
  AWAITING_CONFIRMATION = "AWAITING_CONFIRMATION",
  CONFIRMED = "CONFIRMED",
  REJECTED = "REJECTED",
  CANCELLED = "CANCELLED",
  IN_TRIP = "IN_TRIP",
  COMPLETED = "COMPLETED",
}

export interface Booking {
  id: string;
  tripId: string;
  trip: Trip;
  passengerId: string;
  passenger: User;
  seats: number;
  price: string;
  status: BookingStatus;
  payment?: Payment | null;
  chat?: Conversation | null;
  ratings?: Rating[];
  reports?: Report[];
  tripStops: TripStop[];
  createdAt: string;
  updatedAt: string;
}

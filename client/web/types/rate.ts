import { Booking } from "./Booking";
import { User } from "./User";

export enum RatingTarget {
  DRIVER = "DRIVER",
  PASSENGER = "PASSENGER",
}

export enum ReportTarget {
  DRIVER = "DRIVER",
  PASSENGER = "PASSENGER",
}

export enum ReportType {
  USER_BEHAVIOR = "USER_BEHAVIOR",
  TRIP_PROBLEM = "TRIP_PROBLEM",
  DRIVER_ISSUE = "DRIVER_ISSUE",
  PASSENGER_ISSUE = "PASSENGER_ISSUE",
  VEHICLE_ISSUE = "VEHICLE_ISSUE",
  PAYMENT_ISSUE = "PAYMENT_ISSUE",
  FRAUD = "FRAUD",
  SAFETY = "SAFETY",
  OTHER = "OTHER",
}

export enum ReportStatus {
  PENDING = "PENDING",
  REVIEWING = "REVIEWING",
  RESOLVED = "RESOLVED",
  REJECTED = "REJECTED",
}

export interface Rating {
  id: string;
  bookingId: string;
  fromUserId: string;
  fromUser?: User;
  toUserId: string;
  toUser?: User;
  target: RatingTarget;
  stars: number;
  comment: string | null;
  createdAt: string;
}

export interface Report {
  id: string;
  reporterId: string;
  reporter?: User;
  targetUserId: string;
  targetUser?: User;
  bookingId: string;
  booking?: Booking;
  type: ReportType;
  title: string;
  description: string;
  status: ReportStatus;
  createdAt: string;
  updatedAt: string;
}

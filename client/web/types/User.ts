import { Booking } from "./Booking";
import { Message, OTPCode } from "./chat";
import { Driver } from "./Driver";
import { UserLocation } from "./location";
import { Rating } from "./rate";

export enum Role {
  ADMIN = "ADMIN",
  PASSENGER = "PASSENGER",
  DRIVER = "DRIVER",
}

export enum UserStatus {
  ACTIVE = "ACTIVE",
  PENDING = "PENDING",
  SUSPENDED = "SUSPENDED",
  BLOCKED = "BLOCKED",
  DEACTIVATED = "DEACTIVATED",
}

export enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE",
  OTHER = "OTHER",
}

export interface User {
  id: string;
  phone: string;
  role: Role;
  status: UserStatus;
  fullName: string;
  gender: Gender;
  birthDate: string;
  photoUrl: string | null;
  emergencyPhone: string | null;
  driver?: Driver | null;
  location?: UserLocation | null;
  bookings?: Booking[];
  notifications?: Notification[];
  otpCodes?: OTPCode[];
  messages?: Message[];
  givenRatings?: Rating[];
  receivedRatings?: Rating[];
  reportsMade?: Report[];
  reportsReceived?: Report[];
  createdAt: string;
  updatedAt: string;
}

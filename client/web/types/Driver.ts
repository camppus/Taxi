import { User } from "./User";

export enum DriverRequestStatus {
  PENDING = "PENDING",
  IN_REVIEW = "IN_REVIEW",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
  SUSPENDED = "SUSPENDED",
}

export enum DriverStatus {
  ONLINE = "ONLINE",
  OFFLINE = "OFFLINE",
  SUSPENDED = "SUSPENDED",
  INACTIVE = "INACTIVE",
}

export enum DriverDocumentType {
  ID_CARD = "ID_CARD",
  DRIVER_LICENSE = "DRIVER_LICENSE",
  SELFIE = "SELFIE",
  PROFILE_PHOTO = "PROFILE_PHOTO",
  POLICE_RECORD = "POLICE_RECORD",
  MEDICAL_CERTIFICATE = "MEDICAL_CERTIFICATE",
}

export enum VehicleStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
}

export interface DriverDocument {
  id: string;
  driverId: string;
  type: DriverDocumentType;
  fileUrl: string;
  verified: boolean;
  verifiedAt: string | null;
  expiresAt: string | null;
  createdAt: string;
}

export interface VehicleDocument {
  id: string;
  vehicleId: string;
  type: string;
  fileUrl: string;
  verified: boolean;
  expiresAt: string | null;
  createdAt: string;
}

export interface Vehicle {
  id: string;
  driverId: string;
  name: string;
  capacity: number;
  description: string | null;
  vehicleTypeId: string;
  brand: string;
  model: string;
  year: number;
  color: string;
  plateNumber: string;
  totalSeats: number;
  passengerSeats: number;
  status: VehicleStatus;
  rejectionReason: string | null;
  documents?: VehicleDocument[];
  createdAt: string;
  updatedAt: string;
}

export interface Driver {
  id: string;
  userId: string;
  requestStatus: DriverRequestStatus;
  user: User;
  rejectionReason: string | null;
  approvedAt: string | null;
  approvedBy: string | null;
  licenseCategory: string | null;
  identityNumber: string | null;
  licenseNumber: string;
  licenseExpiry: string | null;
  status: DriverStatus;
  vehicles?: Vehicle[];
  documents?: DriverDocument[];
  createdAt: string;
  updatedAt: string;
}

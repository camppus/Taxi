export enum VehicleDocumentTypeDto {
  REGISTRATION = "REGISTRATION",
  INSURANCE = "INSURANCE",
  INSPECTION = "INSPECTION",
  PHOTO = "PHOTO",
}

export interface VehicleDocument {
  id: string;
  type: VehicleDocumentTypeDto;
  fileUrl: string[];
  expiresAt?: Date;
}

export type VehicleStatus =
  | "ACTIVE"
  | "PENDING_VERIFICATION"
  | "INACTIVE"
  | "SUSPENDED";

export type FuelType = "PETROL" | "DIESEL" | "HYBRID" | "ELECTRIC";
export type Transmission = "AUTOMATIC" | "MANUAL";

export interface Vehicle {
  id: string;
  name: string;
  description?: string;
  vehicleTypeId: string;

  imageUrl: string;

  brand: string;
  model: string;
  year: number;
  color: string;
  plateNumber: string;

  totalSeats: number;
  passengerSeats: number;

  fuelType: FuelType;
  transmission: Transmission;

  status: VehicleStatus;
  isVerified: boolean;
  verifiedAt?: Date;

  document: Record<VehicleDocumentTypeDto, VehicleDocument>;

  createdAt: Date;
  updatedAt: Date;
}

import { IsString, IsOptional, IsDateString } from "class-validator";

export enum VehicleDocumentTypeDto {
  REGISTRATION = "REGISTRATION",

  INSURANCE = "INSURANCE",

  INSPECTION = "INSPECTION",

  PHOTO = "PHOTO",
}

export class CreateVehicleDocumentDto {
  @IsString()
  type!: VehicleDocumentTypeDto;

  @IsString()
  fileUrl!: string;

  @IsOptional()
  @IsDateString()
  expiresAt?: string;
}

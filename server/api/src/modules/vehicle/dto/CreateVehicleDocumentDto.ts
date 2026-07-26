import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsOptional, IsDateString } from "class-validator";

export enum VehicleDocumentTypeDto {
  REGISTRATION = "REGISTRATION",

  INSURANCE = "INSURANCE",

  INSPECTION = "INSPECTION",

  PHOTO = "PHOTO",
}

export class CreateVehicleDocumentDto {
  @ApiProperty()
  @IsString()
  type!: VehicleDocumentTypeDto;

  @IsString()
  @ApiProperty()
  fileUrl!: string;

  @IsOptional()
  @ApiProperty()
  @IsDateString()
  expiresAt?: string;
}

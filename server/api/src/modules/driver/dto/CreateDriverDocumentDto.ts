import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsEnum, IsOptional, IsDateString } from "class-validator";

export enum DriverDocumentType {
  ID_CARD = "ID_CARD",

  DRIVER_LICENSE = "DRIVER_LICENSE",

  SELFIE = "SELFIE",

  PROFILE_PHOTO = "PROFILE_PHOTO",

  POLICE_RECORD = "POLICE_RECORD",

  MEDICAL_CERTIFICATE = "MEDICAL_CERTIFICATE",
}

export class CreateDriverDocumentDto {
  @IsEnum(DriverDocumentType)
  @ApiProperty()
  type!: DriverDocumentType;

  @IsString()
  @ApiProperty()
  fileUrl!: string;

  @IsOptional()
  @IsDateString()
  @ApiProperty()
  expiresAt?: string;
}

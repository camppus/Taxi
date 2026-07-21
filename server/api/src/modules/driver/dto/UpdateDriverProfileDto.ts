import { IsOptional, IsString, IsDateString } from "class-validator";

export class UpdateDriverProfileDto {
  @IsOptional()
  @IsString()
  identityNumber?: string;

  @IsOptional()
  @IsString()
  licenseNumber?: string;

  @IsOptional()
  @IsString()
  licenseCategory?: string;

  @IsOptional()
  @IsDateString()
  licenseExpiry?: string;
}

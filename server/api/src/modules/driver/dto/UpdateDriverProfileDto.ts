import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString, IsDateString } from "class-validator";

export class UpdateDriverProfileDto {
  @IsOptional()
  @ApiProperty()
  @IsString()
  identityNumber?: string;

  @IsOptional()
  @ApiProperty()
  @IsString()
  licenseNumber?: string;

  @IsOptional()
  @ApiProperty()
  @IsString()
  licenseCategory?: string;

  @IsOptional()
  @ApiProperty()
  @IsDateString()
  licenseExpiry?: string;
}

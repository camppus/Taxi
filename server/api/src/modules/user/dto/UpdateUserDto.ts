import {
  IsString,
  IsPhoneNumber,
  IsEnum,
  IsDateString,
  IsOptional,
} from "class-validator";
import { Gender } from "@prisma/client";

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  fullName?: string;

  @IsOptional()
  @IsPhoneNumber("AO")
  phone?: string;

  @IsOptional()
  @IsEnum(Gender)
  gender?: Gender;

  @IsOptional()
  @IsDateString()
  birthDate?: string;

  @IsOptional()
  @IsString()
  photoUrl?: string;

  @IsOptional()
  @IsString()
  emergencyPhone?: string;

  @IsOptional()
  @IsString()
  selfieUrl?: string;
}

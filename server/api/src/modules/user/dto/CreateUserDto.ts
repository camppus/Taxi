import {
  IsString,
  IsPhoneNumber,
  IsEnum,
  IsDateString,
  IsOptional,
} from "class-validator";
import { Gender } from "@prisma/client";
export class CreateUserDto {
  @IsString()
  fullName!: string;

  @IsPhoneNumber("AO")
  phone!: string;

  @IsEnum(Gender)
  gender!: Gender;

  @IsOptional()
  @IsDateString()
  birthDate!: string;

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

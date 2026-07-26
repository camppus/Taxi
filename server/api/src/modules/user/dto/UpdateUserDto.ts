import {
  IsString,
  IsPhoneNumber,
  IsEnum,
  IsDateString,
  IsOptional,
} from "class-validator";
import { Gender } from "@prisma/client";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateUserDto {
  @IsOptional()
  @ApiProperty()
  @IsString()
  fullName?: string;

  @IsOptional()
  @IsPhoneNumber("AO")
  @ApiProperty()
  phone?: string;

  @IsOptional()
  @IsEnum(Gender)
  @ApiProperty()
  gender?: Gender;

  @IsOptional()
  @ApiProperty()
  @IsDateString()
  birthDate?: string;

  @IsOptional()
  @ApiProperty()
  @IsString()
  photoUrl?: string;

  @IsOptional()
  @ApiProperty()
  @IsString()
  emergencyPhone?: string;

  @IsOptional()
  @ApiProperty()
  @IsString()
  selfieUrl?: string;
}

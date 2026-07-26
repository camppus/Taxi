import {
  IsString,
  IsPhoneNumber,
  IsEnum,
  IsDateString,
  IsOptional,
} from "class-validator";
import { Gender } from "@prisma/client";
import { ApiProperty } from "@nestjs/swagger";
export class CreateUserDto {
  @ApiProperty()
  @IsString()
  fullName!: string;

  @IsPhoneNumber("AO")
  @ApiProperty()
  phone!: string;

  @IsEnum(Gender)
  @ApiProperty()
  gender!: Gender;

  @IsOptional()
  @ApiProperty()
  @IsDateString()
  birthDate!: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
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

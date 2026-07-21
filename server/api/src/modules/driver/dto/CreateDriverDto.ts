import { ValidateNested, IsObject } from "class-validator";
import { Type } from "class-transformer";
import { CreateUserDto } from "src/modules/user/dto/CreateUserDto";

export class CreateDriverDto {
  @IsObject()
  @ValidateNested()
  @Type(() => CreateUserDto)
  user!: CreateUserDto;

  @IsObject()
  @ValidateNested()
  @Type(() => CreateDriverProfileDto)
  driver!: CreateDriverProfileDto;
}

import { IsOptional, IsString, IsDateString } from "class-validator";

export class CreateDriverProfileDto {
  @IsOptional()
  @IsString()
  identityNumber!: string;

  @IsOptional()
  @IsString()
  licenseNumber!: string;

  @IsOptional()
  @IsString()
  licenseCategory!: string;

  @IsOptional()
  @IsDateString()
  licenseExpiry!: string;
}

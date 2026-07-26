import { ValidateNested, IsObject } from "class-validator";
import { Type } from "class-transformer";
import { CreateUserDto } from "src/modules/user/dto/CreateUserDto";

export class CreateDriverDto {
  @IsObject()
  @ApiProperty()
  @ValidateNested()
  @Type(() => CreateUserDto)
  user!: CreateUserDto;

  @IsObject()
  @ApiProperty()
  @ValidateNested()
  @Type(() => CreateDriverProfileDto)
  driver!: CreateDriverProfileDto;
}

import { IsOptional, IsString, IsDateString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateDriverProfileDto {
  @IsOptional()
  @IsString()
  @ApiProperty()
  identityNumber!: string;

  @IsOptional()
  @ApiProperty()
  @IsString()
  licenseNumber!: string;

  @IsOptional()
  @ApiProperty()
  @IsString()
  licenseCategory!: string;

  @IsOptional()
  @ApiProperty()
  @IsDateString()
  licenseExpiry!: string;
}

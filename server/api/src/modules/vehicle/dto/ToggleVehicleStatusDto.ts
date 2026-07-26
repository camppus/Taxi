import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsOptional, IsString } from "class-validator";

export enum VehicleStatusDto {
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
}

export class ToggleVehicleStatusDto {
  @ApiProperty()
  @IsEnum(VehicleStatusDto)
  status!: VehicleStatusDto;

  @IsOptional()
  @IsString()
  @ApiProperty()
  reason?: string;
}

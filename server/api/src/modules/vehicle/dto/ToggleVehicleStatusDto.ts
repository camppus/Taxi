import { IsEnum, IsOptional, IsString } from "class-validator";

export enum VehicleStatusDto {
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
}

export class ToggleVehicleStatusDto {
  @IsEnum(VehicleStatusDto)
  status!: VehicleStatusDto;

  @IsOptional()
  @IsString()
  reason?: string;
}

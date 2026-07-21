import { IsEnum } from "class-validator";

export enum DriverStatus {
  ONLINE = "ONLINE",

  OFFLINE = "OFFLINE",

  SUSPENDED = "SUSPENDED",

  INACTIVE = "INACTIVE",
}

export class ToggleDriverStatusDto {
  @IsEnum(DriverStatus)
  status!: DriverStatus;
}
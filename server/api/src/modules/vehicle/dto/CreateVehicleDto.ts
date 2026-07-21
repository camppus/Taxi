import { IsString, IsInt, IsOptional, Min } from "class-validator";

export class CreateVehicleDto {
  @IsString()
  name!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsString()
  vehicleTypeId!: string;

  @IsString()
  brand!: string;

  @IsString()
  model!: string;

  @IsInt()
  @Min(1900)
  year!: number;

  @IsString()
  color!: string;

  @IsString()
  plateNumber!: string;

  @IsInt()
  @Min(1)
  totalSeats!: number;

  @IsInt()
  @Min(1)
  passengerSeats!: number;
}

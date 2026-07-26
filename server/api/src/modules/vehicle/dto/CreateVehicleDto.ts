import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsInt, IsOptional, Min } from "class-validator";

export class CreateVehicleDto {
  @IsString()
  @ApiProperty()
  name!: string;

  @IsOptional()
  @ApiProperty()
  @IsString()
  description?: string;

  @IsString()
  @ApiProperty()
  vehicleTypeId!: string;

  @IsString()
  @ApiProperty()
  brand!: string;

  @IsString()
  @ApiProperty()
  model!: string;

  @IsInt()
  @Min(1900)
  @ApiProperty()
  year!: number;

  @IsString()
  @ApiProperty()
  color!: string;

  @IsString()
  @ApiProperty()
  plateNumber!: string;

  @IsInt()
  @ApiProperty()
  @Min(1)
  totalSeats!: number;

  @IsInt()
  @ApiProperty()
  @Min(1)
  passengerSeats!: number;
}

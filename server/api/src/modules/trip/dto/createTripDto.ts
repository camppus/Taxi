import {
  IsString,
  IsNumber,
  IsOptional,
  IsDateString,
  Min,
  IsUUID,
} from "class-validator";

export default class CreateTripDto {
  @IsUUID()
  vehicleId!: string;
  @IsOptional()
  @IsString()
  name?: string;
  @IsNumber()
  originLat!: number;
  @IsNumber()
  originLog!: number;
  @IsNumber()
  destinationLat!: number;
  @IsNumber()
  destinationLog!: number;
  @IsDateString()
  departureDate!: string;
  @IsDateString()
  departureTime!: string;
  @IsOptional()
  @IsNumber()
  @Min(1)
  publishedSeats?: number;
  @IsNumber()
  @Min(0)
  priceBase!: number;
}

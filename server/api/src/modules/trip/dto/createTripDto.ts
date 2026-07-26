import { ApiProperty } from "@nestjs/swagger";
import {
  IsString,
  IsNumber,
  IsOptional,
  IsDateString,
  Min,
  IsUUID,
} from "class-validator";

export default class CreateTripDto {
  @ApiProperty()
  @IsUUID()
  vehicleId!: string;
  @IsOptional()
  @IsString()
  @ApiProperty()
  name?: string;
  @IsNumber()
  @ApiProperty()
  originLat!: number;
  @IsNumber()
  @ApiProperty()
  originLog!: number;
  @IsNumber()
  @ApiProperty()
  destinationLat!: number;
  @IsNumber()
  @ApiProperty()
  destinationLog!: number;
  @IsDateString()
  @ApiProperty()
  departureDate!: string;
  @IsDateString()
  @ApiProperty()
  departureTime!: string;
  @IsOptional()
  @ApiProperty()
  @IsNumber()
  @Min(1)
  publishedSeats?: number;
  @IsNumber()
  @ApiProperty()
  @Min(0)
  priceBase!: number;
}

import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsOptional, IsInt, Min } from "class-validator";

export class UpdateVehicleDto {
  @IsOptional()
  @ApiProperty()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  description?: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  brand?: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  model?: string;

  @IsOptional()
  @IsInt()
  @ApiProperty()
  @Min(1900)
  year?: number;

  @IsOptional()
  @ApiProperty()
  @IsString()
  color?: string;

  @IsOptional()
  @ApiProperty()
  @IsInt()
  @Min(1)
  totalSeats?: number;

  @IsOptional()
  @ApiProperty()
  @IsInt()
  @Min(1)
  passengerSeats?: number;
}

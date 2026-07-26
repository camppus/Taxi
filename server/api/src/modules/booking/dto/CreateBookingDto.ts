import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsPositive, IsUUID } from "class-validator";

export default class CreateBookingDto {
  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  tripId!: string;
  @IsPositive()
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  seats!: number;
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
}

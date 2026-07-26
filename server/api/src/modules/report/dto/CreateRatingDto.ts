import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  Min,
} from "class-validator";
import { RatingTarget } from "@prisma/client";
import { ApiProperty } from "@nestjs/swagger";

export default class CreateRatingDto {
  @IsUUID()
  @ApiProperty()
  @IsNotEmpty()
  bookingId!: string;
  @IsUUID()
  @ApiProperty()
  @IsNotEmpty()
  toUserId!: string;
  @IsEnum(RatingTarget)
  @ApiProperty()
  @IsNotEmpty()
  target!: RatingTarget;
  @IsInt()
  @Min(1)
  @ApiProperty()
  @IsNotEmpty()
  @Max(5)
  stars!: number;
  @IsOptional()
  @ApiProperty()
  @IsString()
  comment?: string;
}

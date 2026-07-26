import { IsEnum, IsNotEmpty, IsString, IsUUID } from "class-validator";
import { ReportType } from "@prisma/client";
import { ApiProperty } from "@nestjs/swagger";

export default class CreateReportDto {
  @IsUUID()
  @ApiProperty()
  @IsNotEmpty()
  targetUserId!: string;

  @IsUUID()
  @ApiProperty()
  @IsNotEmpty()
  bookingId!: string;

  @IsEnum(ReportType)
  @ApiProperty()
  @IsNotEmpty()
  type!: ReportType;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  @IsNotEmpty()
  description!: string;
}

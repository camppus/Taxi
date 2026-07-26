import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsOptional, IsString } from "class-validator";

export class VerifyVehicleDocumentDto {
  @IsBoolean()
  @ApiProperty()
  approved!: boolean;

  @IsOptional()
  @ApiProperty()
  @IsString()
  rejectionReason?: string;
}

import { IsBoolean, IsOptional, IsString } from "class-validator";

export class VerifyVehicleDocumentDto {
  @IsBoolean()
  approved!: boolean;

  @IsOptional()
  @IsString()
  rejectionReason?: string;
}

import { IsString } from "class-validator";

export class ApproveDriverDto {
  @IsString()
  adminId!: string;
}

import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class ApproveDriverDto {
  @IsString()
    @ApiProperty()
  adminId!: string;
}

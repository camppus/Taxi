import { ApiProperty } from "@nestjs/swagger";
import { IsString, MinLength } from "class-validator";

export class RejectDriverDto {
  @IsString()
    @ApiProperty()
  @MinLength(5)
  reason!: string;
}

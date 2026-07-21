import { IsPhoneNumber, IsString, Length } from "class-validator";

export class RequestOtpDto {
  @IsPhoneNumber("AO")
  phone!: string;
}

export class VerifyOtpDto {
  @IsPhoneNumber("AO")
  phone!: string;

  @IsString()
  @Length(6, 6)
  code!: string;
}

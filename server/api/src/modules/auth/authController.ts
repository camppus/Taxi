import { Body, Controller, Post } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { RequestOtpUseCase } from "./usecases/RequestOtpUseCase";
import { VerifyOtpUseCase } from "./usecases/VerifyOtpUseCase";
import { RequestOtpDto, VerifyOtpDto } from "./dto/authDto";

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
  constructor(
    private readonly requestOtpUseCase: RequestOtpUseCase,
    private readonly verifyOtpUseCase: VerifyOtpUseCase,
  ) {}

  @Post("request-otp")
  @ApiOperation({ summary: "Solicitar código OTP" })
  @ApiResponse({ status: 201, description: "OTP enviado com sucesso" })
  requestOtp(@Body() dto: RequestOtpDto) {
    return this.requestOtpUseCase.execute(dto);
  }

  @Post("verify-otp")
  @ApiOperation({ summary: "Verificar código OTP e gerar JWT" })
  @ApiResponse({ status: 200, description: "Login realizado com sucesso" })
  verifyOtp(@Body() dto: VerifyOtpDto) {
    return this.verifyOtpUseCase.execute(dto);
  }
}

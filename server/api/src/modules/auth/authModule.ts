import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PrismaService } from "src/infra/Prisma/prisma.module";
import { RequestOtpUseCase } from "./usecases/RequestOtpUseCase";
import { VerifyOtpUseCase } from "./usecases/VerifyOtpUseCase";
import { FakeSmsProvider } from "src/infra/Sms/providers/FakeSmsProvider";

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: "7d" },
    }),
  ],
  providers: [
    PrismaService,
    RequestOtpUseCase,
    VerifyOtpUseCase,
    {
      provide: "SmsProvider",
      useClass: FakeSmsProvider,
    },
  ],
  exports: [RequestOtpUseCase, VerifyOtpUseCase],
})
export class AuthModule {}

import { Inject, Injectable } from "@nestjs/common";
import { PrismaService } from "src/infra/Prisma/prisma.module";
import { RequestOtpDto } from "../dto/authDto";
import type SmsProvider from "src/infra/Sms/SmsProvider";

@Injectable()
export class RequestOtpUseCase {
  constructor(
    private readonly prisma: PrismaService,
    @Inject("SmsProvider")
    private readonly smsProvider: SmsProvider,
  ) {}

  async execute({ phone }: RequestOtpDto) {
    const user = await this.prisma.user.findFirst({
      where: { phone },
    });

    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);

    const attempts = await this.prisma.oTPCode.count({
      where: {
        userId: user.id,
        used: false,
        createdAt: { gte: fiveMinutesAgo },
      },
    });

    if (attempts >= 5) {
      throw new Error(
        "Muitas tentativas. Aguarde 5 minutos para solicitar um novo código.",
      );
    }

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    await this.prisma.oTPCode.create({
      data: {
        userId: user.id,
        code,
        expiresAt,
      },
    });

    await this.smsProvider.sendSms(phone, `Seu código de acesso é: ${code}`);

    return {
      message: "OTP enviado com sucesso",
      error: false,
    };
  }
}

import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "src/infra/Prisma/prisma.module";
import { VerifyOtpDto } from "../dto/authDto";

@Injectable()
export class VerifyOtpUseCase {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async execute({ phone, code }: VerifyOtpDto) {
    const user = await this.prisma.user.findFirst({
      where: { phone },
    });

    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    const otp = await this.prisma.oTPCode.findFirst({
      where: {
        userId: user.id,
        code,
        used: false,
      },
      orderBy: { createdAt: "desc" },
    });

    if (!otp) {
      throw new Error("Código OTP inválido");
    }

    if (otp.expiresAt < new Date()) {
      throw new Error("Código OTP expirado");
    }

    await this.prisma.oTPCode.update({
      where: { id: otp.id },
      data: { used: true },
    });

    const token = await this.jwtService.signAsync(
      {
        sub: user.id,
        phone: user.phone,
        role: user.role,
      },
      { expiresIn: "7d" },
    );

    return {
      access_token: token,
      user: {
        id: user.id,
        fullName: user.fullName,
        phone: user.phone,
        role: user.role,
      },
    };
  }
}

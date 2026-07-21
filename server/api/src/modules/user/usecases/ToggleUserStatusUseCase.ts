import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/infra/Prisma/prisma.module";
import { UserStatus } from "@prisma/client";

@Injectable()
export default class ToggleUserStatusUseCase {
  constructor(private readonly prisma: PrismaService) {}

  async execute(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    const newStatus =
      user.status === UserStatus.ACTIVE
        ? UserStatus.BLOCKED
        : UserStatus.ACTIVE;

    await this.prisma.user.update({
      where: { id },
      data: { status: newStatus },
    });

    return {
      message: `Status alterado para ${newStatus}`,
      error: false,
    };
  }
}

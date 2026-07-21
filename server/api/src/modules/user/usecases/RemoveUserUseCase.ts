import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/infra/Prisma/prisma.module";

@Injectable()
export default class RemoveUserUseCase {
  constructor(private readonly prisma: PrismaService) {}

  async execute(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    await this.prisma.user.delete({
      where: { id },
    });

    return {
      message: "Usuário removido com sucesso",
      error: false,
    };
  }
}

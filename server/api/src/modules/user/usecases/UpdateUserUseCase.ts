import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/infra/Prisma/prisma.module";
import { UpdateUserDto } from "../dto/UpdateUserDto";

@Injectable()
export default class UpdateUserUseCase {
  constructor(private readonly prisma: PrismaService) {}

  async execute(id: string, data: UpdateUserDto) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    const hasPhone = await this.prisma.user.findFirst({
      where: {
        phone: data.phone,
        NOT: { id },
      },
    });

    if (hasPhone) {
      throw new Error("Telefone já foi registrado");
    }

    await this.prisma.user.update({
      where: { id },
      data,
    });

    return {
      message: "Usuário atualizado com sucesso",
      error: false,
    };
  }
}

import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/infra/Prisma/prisma.module";

@Injectable()
export default class GetUserByIdUseCase {
  constructor(private readonly prisma: PrismaService) {}

  async execute(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        driver: true,
      },
    });

    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    return user;
  }
}

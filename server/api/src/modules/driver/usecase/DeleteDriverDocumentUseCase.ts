import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/infra/Prisma/prisma.module";

@Injectable()
export default class DeleteDriverDocumentUseCase {
  constructor(private readonly prisma: PrismaService) {}

  async execute(id: string) {
    const document = await this.prisma.driverDocument.findUnique({
      where: {
        id,
      },
    });

    if (!document) throw new Error("Documento não encontrado");

    if (document.verified)
      throw new Error("Documento verificado não pode ser removido");

    await this.prisma.driverDocument.delete({
      where: {
        id,
      },
    });

    return {
      message: "Documento removido",
      error: false,
    };
  }
}

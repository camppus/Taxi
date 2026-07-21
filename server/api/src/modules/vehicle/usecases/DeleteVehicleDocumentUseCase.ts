import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/infra/Prisma/prisma.module";

@Injectable()
export default class DeleteVehicleDocumentUseCase {
  constructor(private readonly prisma: PrismaService) {}

  async execute(id: string, userId: string) {
    const document = await this.prisma.vehicleDocument.findUnique({
      where: {
        id,
        driver: {
          userId: userId,
        },
      },
    });

    if (!document) {
      throw new Error("Documento não encontrado");
    }

    if (document.verified) {
      throw new Error("Documento verificado não pode ser removido");
    }

    await this.prisma.vehicleDocument.delete({
      where: {
        id,
      },
    });

    return {
      message: "Documento removido com sucesso",

      error: false,
    };
  }
}

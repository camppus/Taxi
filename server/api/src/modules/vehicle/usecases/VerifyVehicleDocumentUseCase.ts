import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/infra/Prisma/prisma.module";

@Injectable()
export default class VerifyVehicleDocumentUseCase {
  constructor(private readonly prisma: PrismaService) {}

  async execute(id: string) {
    const document = await this.prisma.vehicleDocument.findUnique({
      where: {
        id,
      },
    });

    if (!document) {
      throw new Error("Documento não encontrado");
    }

    return this.prisma.vehicleDocument.update({
      where: {
        id,
      },

      data: {
        verified: true,
      },
    });
  }
}

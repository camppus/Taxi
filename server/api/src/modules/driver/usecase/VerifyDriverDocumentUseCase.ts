import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/infra/Prisma/prisma.module";

@Injectable()
export default class VerifyDriverDocumentUseCase {
  constructor(private readonly prisma: PrismaService) {}

  async execute(id: string) {
    const document = await this.prisma.driverDocument.findUnique({
      where: {
        id,
      },
    });

    if (!document) throw new Error("Documento não encontrado");

    return this.prisma.driverDocument.update({
      where: {
        id,
      },

      data: {
        verified: true,

        verifiedAt: new Date(),
      },
    });
  }
}

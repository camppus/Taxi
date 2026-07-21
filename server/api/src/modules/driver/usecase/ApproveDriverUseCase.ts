import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/infra/Prisma/prisma.module";
import { UseCase } from "src/shared/interfaces/UseCases";

interface Input {
  driverId: string;
  adminId: string;
}

@Injectable()
export default class ApproveDriverUseCase implements UseCase<Input, any> {
  constructor(private readonly prisma: PrismaService) {}

  async execute(data: Input) {
    const driver = await this.prisma.driverProfile.findUnique({
      where: {
        id: data.driverId,
      },

      include: {
        documents: true,
      },
    });

    if (!driver) throw new Error("Motorista não encontrado");

    const invalidDocuments = driver.documents.some((doc) => !doc.verified);

    if (invalidDocuments) throw new Error("Existem documentos não verificados");

    return this.prisma.driverProfile.update({
      where: {
        id: data.driverId,
      },

      data: {
        requestStatus: "APPROVED",

        approvedAt: new Date(),

        approvedBy: data.adminId,
      },
    });
  }
}

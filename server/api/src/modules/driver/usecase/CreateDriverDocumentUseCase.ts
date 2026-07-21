import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/infra/Prisma/prisma.module";
import { UseCase } from "src/shared/interfaces/UseCases";

interface Input {
  driverId: string;

  type: any;

  fileUrl: string;

  expiresAt?: string;
}

@Injectable()
export default class CreateDriverDocumentUseCase implements UseCase<
  Input,
  any
> {
  constructor(private readonly prisma: PrismaService) {}

  async execute(data: Input) {
    const driver = await this.prisma.driverProfile.findUnique({
      where: {
        id: data.driverId,
      },
    });

    if (!driver) throw new Error("Motorista não encontrado");

    const exists = await this.prisma.driverDocument.findFirst({
      where: {
        driverId: data.driverId,
        type: data.type,
      },
    });

    if (exists) throw new Error("Este documento já existe");

    return this.prisma.driverDocument.create({
      data: {
        driverId: data.driverId,

        type: data.type,

        fileUrl: data.fileUrl,

        expiresAt: data.expiresAt ? new Date(data.expiresAt) : null,
      },
    });
  }
}

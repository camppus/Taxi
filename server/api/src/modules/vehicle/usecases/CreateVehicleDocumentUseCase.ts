import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/infra/Prisma/prisma.module";
import { UseCase } from "src/shared/interfaces/UseCases";

interface CreateVehicleDocumentInput {
  vehicleId: string;
  type: string;
  fileUrl: string;
  expiresAt?: string;
  userId: string;
}

@Injectable()
export default class CreateVehicleDocumentUseCase implements UseCase<
  CreateVehicleDocumentInput,
  any
> {
  constructor(private readonly prisma: PrismaService) {}

  async execute(data: CreateVehicleDocumentInput) {
    const vehicle = await this.prisma.vehicle.findUnique({
      where: {
        id: data.vehicleId,
        driver: {
          userId: data.userId,
        },
      },
    });

    if (!vehicle) {
      throw new Error("Veículo não encontrado");
    }

    const exists = await this.prisma.vehicleDocument.findFirst({
      where: {
        vehicleId: data.vehicleId,
        type: data.type,
      },
    });

    if (exists) {
      throw new Error("Este documento já existe para este veículo");
    }

    return this.prisma.vehicleDocument.create({
      data: {
        vehicleId: data.vehicleId,
        type: data.type,
        fileUrl: data.fileUrl,
        expiresAt: data.expiresAt ? new Date(data.expiresAt) : null,
        verified: false,
      },
    });
  }
}

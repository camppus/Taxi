import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/infra/Prisma/prisma.module";
import { UseCase } from "src/shared/interfaces/UseCases";

interface UpdateDriverInput {
  id: string;

  identityNumber?: string;
  licenseNumber?: string;
  licenseCategory?: string;
  licenseExpiry?: string;
}

@Injectable()
export default class UpdateDriverProfileUseCase implements UseCase<
  UpdateDriverInput,
  any
> {
  constructor(private readonly prisma: PrismaService) {}

  async execute(data: UpdateDriverInput) {
    const driver = await this.prisma.driverProfile.findUnique({
      where: {
        id: data.id,
      },
    });

    if (!driver) {
      throw new Error("Motorista não encontrado");
    }

    if (data.identityNumber) {
      const exists = await this.prisma.driverProfile.findFirst({
        where: {
          identityNumber: data.identityNumber,
          NOT: {
            id: data.id,
          },
        },
      });

      if (exists) throw new Error("BI já pertence a outro motorista");
    }

    if (data.licenseNumber) {
      const exists = await this.prisma.driverProfile.findFirst({
        where: {
          licenseNumber: data.licenseNumber,
          NOT: {
            id: data.id,
          },
        },
      });

      if (exists) throw new Error("Carta já pertence a outro motorista");
    }

    return this.prisma.driverProfile.update({
      where: {
        id: data.id,
      },

      data: {
        identityNumber: data.identityNumber,

        licenseNumber: data.licenseNumber,

        licenseCategory: data.licenseCategory,

        licenseExpiry: data.licenseExpiry
          ? new Date(data.licenseExpiry)
          : undefined,
      },
    });
  }
}

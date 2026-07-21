import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/infra/Prisma/prisma.module";
import { UseCase } from "src/shared/interfaces/UseCases";

interface Input {
  driverId: string;
  reason: string;
}

@Injectable()
export default class RejectDriverUseCase implements UseCase<Input, any> {
  constructor(private readonly prisma: PrismaService) {}

  async execute(data: Input) {
    const driver = await this.prisma.driverProfile.findUnique({
      where: {
        id: data.driverId,
      },
    });

    if (!driver) throw new Error("Motorista não encontrado");

    return this.prisma.driverProfile.update({
      where: {
        id: data.driverId,
      },

      data: {
        requestStatus: "REJECTED",

        rejectionReason: data.reason,
      },
    });
  }
}

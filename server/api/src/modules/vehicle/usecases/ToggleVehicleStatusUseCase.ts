import { Injectable } from "@nestjs/common";
import { VehicleStatus } from "@prisma/client";
import { PrismaService } from "src/infra/Prisma/prisma.module";

interface Input {
  vehicleId: string;
  status: "APPROVED" | "REJECTED";
  reason?: string;
}

@Injectable()
export default class ToggleVehicleStatusUseCase {
  constructor(private readonly prisma: PrismaService) {}

  async execute(data: Input) {
    const vehicle = await this.prisma.vehicle.findUnique({
      where: {
        id: data.vehicleId,
      },
    });

    if (!vehicle) throw new Error("Veículo não encontrado");

    return this.prisma.vehicle.update({
      where: {
        id: data.vehicleId,
      },

      data: {
        status: data.status as VehicleStatus,
        rejectionReason: data.status === "REJECTED" ? data.reason : null,
      },
    });
  }
}

import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/infra/Prisma/prisma.module";
import { CreateVehicleInput } from "./CreateVehicleUseCase";

@Injectable()
export default class UpdateVehicleUseCase {
  constructor(private readonly prisma: PrismaService) {}

  async execute(userId: string, data: CreateVehicleInput) {
    const vehicle = await this.prisma.vehicle.findUnique({
      where: {
        id: data.id,
        driver: {
          userId: userId,
        },
      },
    });

    if (!vehicle) throw new Error("Veículo não encontrado");

    return this.prisma.vehicle.update({
      where: {
        id: data.id,
      },

      data: {
        name: data.name,
        description: data.description,
        brand: data.brand,
        model: data.model,
        year: data.year,
        color: data.color,
        totalSeats: data.totalSeats,
        passengerSeats: data.passengerSeats,
        capacity: data.capacity,
        plateNumber: data.plateNumber,
        vehicleTypeId: data.vehicleTypeId,
      },
    });
  }
}

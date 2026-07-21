import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/infra/Prisma/prisma.module";
import { UseCase } from "src/shared/interfaces/UseCases";

export interface CreateVehicleInput {
  id: string;
  driverId: string;
  name: string;
  description?: string;
  brand: string;
  model: string;
  year: number;
  color: string;
  plateNumber: string;
  totalSeats: number;
  passengerSeats: number;
  vehicleTypeId: string;
  capacity: number;
}

@Injectable()
export default class CreateVehicleUseCase implements UseCase<
  CreateVehicleInput,
  any
> {
  constructor(private readonly prisma: PrismaService) {}

  async execute(data: CreateVehicleInput) {
    const driver = await this.prisma.driverProfile.findUnique({
      where: {
        id: data.driverId,
      },
    });

    if (!driver) throw new Error("Motorista não encontrado");

    if (driver.requestStatus !== "APPROVED") {
      throw new Error("Motorista ainda não aprovado");
    }

    const exists = await this.prisma.vehicle.findUnique({
      where: {
        plateNumber: data.plateNumber,
      },
    });

    if (exists) {
      throw new Error("Matrícula já registrada");
    }

    return await this.prisma.vehicle.create({
      data: {
        driverId: data.driverId,
        name: data.name,
        description: data.description,
        brand: data.brand,
        model: data.model,
        year: data.year,
        color: data.color,
        plateNumber: data.plateNumber,
        totalSeats: data.totalSeats,
        passengerSeats: data.passengerSeats,
        vehicleTypeId: data.vehicleTypeId,
        status: "PENDING",
        capacity: data.capacity,
      },
    });
  }
}

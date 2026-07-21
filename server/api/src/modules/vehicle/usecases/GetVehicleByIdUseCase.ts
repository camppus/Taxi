import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/infra/Prisma/prisma.module";

@Injectable()
export default class GetVehicleByIdUseCase {
  constructor(private readonly prisma: PrismaService) {}

  async execute(id: string) {
    const vehicle = await this.prisma.vehicle.findUnique({
      where: {
        id,
      },
      include: {
        documents: true,
        driver: {
          include: {
            user: {
              select: {
                id: true,
                fullName: true,
                phone: true,
              },
            },
          },
        },
        trips: {
          take: 10,
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    if (!vehicle) throw new Error("Veículo não encontrado");

    return vehicle;
  }
}

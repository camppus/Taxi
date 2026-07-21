import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/infra/Prisma/prisma.module";

@Injectable()
export default class GetMyVehiclesUseCase {
  constructor(private readonly prisma: PrismaService) {}

  async execute(userId: string, page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;

    const [vehicles, total] = await Promise.all([
      this.prisma.vehicle.findMany({
        where: {
          driver: {
            userId: userId,
          },
        },
        skip,
        take: limit,
        include: {
          documents: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      }),

      this.prisma.vehicle.count({
        where: {
          driver: {
            userId: userId,
          },
        },
      }),
    ]);

    return {
      data: vehicles,
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    };
  }
}

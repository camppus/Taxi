import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/infra/Prisma/prisma.module";

@Injectable()
export default class GetAllVehiclesUseCase {
  constructor(private readonly prisma: PrismaService) {}

  async execute(page = 1, limit = 10) {
    const skip = (page - 1) * limit;

    const [vehicles, total] = await Promise.all([
      this.prisma.vehicle.findMany({
        skip,
        take: limit,
        include: {
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

          documents: true,
        },

        orderBy: {
          createdAt: "desc",
        },
      }),

      this.prisma.vehicle.count(),
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

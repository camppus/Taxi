import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/infra/Prisma/prisma.module";
import { Role } from "src/modules/user/entities/User";

interface GetMyTripsInput {
  userId: string;
  role: Role;
  page: number;
  limit: number;
}

@Injectable()
export default class GetMyTripsUseCase {
  constructor(private readonly prisma: PrismaService) {}

  async execute(data: GetMyTripsInput) {
    const skip = (data.page - 1) * data.limit;
    let where: any = {};

    const user = await this.prisma.user.findFirst({
      where: {
        id: data.userId,
      },
    });

    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    if (user.status !== "ACTIVE") {
      throw new Error("Usuário não activo");
    }

    if (data.role === "DRIVER") {
      const driver = await this.prisma.driverProfile.findUnique({
        where: {
          userId: data.userId,
        },
      });

      if (!driver) {
        throw new Error("Motorista não encontrado");
      }

      where = {
        driverId: driver.id,
      };
    }

    if (data.role === "PASSENGER") {
      where = {
        bookings: {
          some: {
            passengerId: data.userId,
          },
        },
      };
    }

    const [trips, total] = await Promise.all([
      this.prisma.trip.findMany({
        skip,

        take: data.limit,

        where,

        include: {
          origin: true,

          destination: true,

          vehicle: true,

          bookings: {
            where: {
              passengerId: data.userId,
            },
            select: {
              id: true,
              status: true,
              seats: true,
              price: true,
            },
          },
        },

        orderBy: {
          departureDate: "desc",
        },
      }),

      this.prisma.trip.count({
        where,
      }),
    ]);

    return {
      data: trips,
      page: data.page,

      limit: data.limit,

      total,

      totalPages: Math.ceil(total / data.limit),
    };
  }
}

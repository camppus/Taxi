import { Injectable } from "@nestjs/common";
import { TripStatus } from "@prisma/client";
import { PrismaService } from "src/infra/Prisma/prisma.module";
import { UseCase } from "src/shared/interfaces/UseCases";

interface GetAllTripsInput {
  page: number;
  limit: number;
}

@Injectable()
export default class GetAllTripsUseCase implements UseCase<
  GetAllTripsInput & { status: TripStatus[] },
  any
> {
  constructor(private readonly prisma: PrismaService) {}

  async execute(data: GetAllTripsInput & { status: TripStatus[] }) {
    const skip = (data.page - 1) * data.limit;

    const [trips, total] = await Promise.all([
      this.prisma.trip.findMany({
        skip,

        take: data.limit,

        where: {
          status: {
            in: data.status,
          },
        },

        include: {
          driver: {
            include: {
              user: {
                select: {
                  id: true,
                  fullName: true,
                  photoUrl: true,
                },
              },
            },
          },

          vehicle: {
            select: {
              id: true,
              name: true,
              brand: true,
              model: true,
              totalSeats: true,
            },
          },

          origin: true,

          destination: true,
          stops: true,
        },

        orderBy: {
          departureDate: "asc",
        },
      }),

      this.prisma.trip.count({
        where: {
          status: "PUBLISHED",
        },
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

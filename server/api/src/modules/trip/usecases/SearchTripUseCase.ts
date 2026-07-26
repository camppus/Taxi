import { Injectable, Inject } from "@nestjs/common";
import { PrismaService } from "src/infra/Prisma/prisma.module";
import { UseCase } from "src/shared/interfaces/UseCases";
import type { LocationServiceProvider } from "src/modules/location/LocationServiceProvider";

interface SearchTripInput {
  query?: string;
  latitude?: number;
  longitude?: number;
  page: number;
  limit: number;
}

export interface SearchTripResponse {
  location: {
    latitude: number;
    longitude: number;
    name: string;
  };

  data: {
    id: string;

    name: string | null;

    departureDate: Date;

    departureTime: Date;

    publishedSeats: number;

    priceBase: any;

    origin: {
      id: string;
      name: string;
      latitude: number;
      longitude: number;
    };

    destination: {
      id: string;
      name: string;
      latitude: number;
      longitude: number;
    };

    vehicle: {
      name: string;
      brand: string;
      model: string;
      totalSeats: number;
    };

    driver: {
      id: string;

      user: {
        fullName: string;
        photoUrl: string | null;
      };
    };
  }[];

  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

@Injectable()
export default class SearchTripUseCase implements UseCase<
  SearchTripInput,
  SearchTripResponse
> {
  constructor(
    private readonly prisma: PrismaService,
    @Inject("LocationServiceProvider")
    private readonly locationProvider: LocationServiceProvider,
  ) {}

  async execute(data: SearchTripInput): Promise<SearchTripResponse> {
    const page = data.page ?? 1;
    const limit = data.limit ?? 10;
    const skip = (page - 1) * limit;
    let location;

    if (data.query) {
      location = await this.locationProvider.geocode(data.query);
    } else if (data.latitude && data.longitude) {
      location = await this.locationProvider.reverseGeocode(
        data.latitude,
        data.longitude,
      );
    } else {
      throw new Error("Informe um local ou coordenadas");
    }

    if (!location) {
      throw new Error("Localização não encontrada");
    }

    const where = {
      status: "PUBLISHED",
      departureDate: {
        gt: new Date(),
      },

      publishedSeats: {
        gt: 0,
      },

      OR: [
        {
          origin: {
            latitude: {
              gte: location.latitude - 0.01,
              lte: location.latitude + 0.01,
            },

            longitude: {
              gte: location.longitude - 0.01,
              lte: location.longitude + 0.01,
            },
          },
        },

        {
          destination: {
            latitude: {
              gte: location.latitude - 0.01,
              lte: location.latitude + 0.01,
            },

            longitude: {
              gte: location.longitude - 0.01,
              lte: location.longitude + 0.01,
            },
          },
        },
      ],
    } as any;

    const [trips, total] = await Promise.all([
      this.prisma.trip.findMany({
        where,
        include: {
          origin: true,

          destination: true,

          vehicle: {
            select: {
              name: true,
              brand: true,
              model: true,
              totalSeats: true,
            },
          },

          driver: {
            include: {
              user: {
                select: {
                  fullName: true,
                  photoUrl: true,
                },
              },
            },
          },
        },

        skip,

        take: limit,

        orderBy: {
          departureDate: "asc",
        },
      }),

      this.prisma.trip.count({
        where,
      }),
    ]);

    return {
      location,
      data: trips as any,
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    };
  }
}

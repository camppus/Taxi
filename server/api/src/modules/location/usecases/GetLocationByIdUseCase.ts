import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/infra/Prisma/prisma.module";
import { UseCase } from "src/shared/interfaces/UseCases";

interface GetLocationByIdInput {
  id: string;
}

@Injectable()
export default class GetLocationByIdUseCase implements UseCase<
  GetLocationByIdInput,
  any
> {
  constructor(private readonly prisma: PrismaService) {}

  async execute(data: GetLocationByIdInput) {
    const location = await this.prisma.location.findUnique({
      where: {
        id: data.id,
      },
      include: {
        tripOrigins: true,
        tripDestinations: true,
        dropoffBookings: true,
        pickupBookings: true,
        tripStops: true,
      },
    });

    if (!location) {
      throw new Error("Localização não encontrada");
    }

    return location;
  }
}

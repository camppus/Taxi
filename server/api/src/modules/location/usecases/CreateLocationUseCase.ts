import { Injectable, Inject } from "@nestjs/common";
import { PrismaService } from "src/infra/Prisma/prisma.module";
import { UseCase } from "src/shared/interfaces/UseCases";
import type { LocationServiceProvider } from "../LocationServiceProvider";

interface CreateLocationInput {
  latitude: number;
  longitude: number;
}

@Injectable()
export default class CreateLocationUseCase implements UseCase<
  CreateLocationInput,
  any
> {
  constructor(
    private readonly prisma: PrismaService,

    @Inject("LocationServiceProvider")
    private readonly locationProvider: LocationServiceProvider,
  ) {}

  async execute({ latitude, longitude }: CreateLocationInput) {
    const location = await this.locationProvider.reverseGeocode(
      latitude,
      longitude,
    );

    if (!location) {
      throw new Error("Erro ao criar localização");
    }

    return this.prisma.location.create({
      data: {
        name: location.name,
        latitude: latitude,
        longitude: longitude,
        city: location.city ?? "",
        neighborhood: location.neighborhood ?? "",
        province: location.province ?? "",
        street: location.street ?? "",
        country: location.country,
        accuracy: 0,
        description: location.formattedAddress,
        externalId: location.osmId,
        formattedAddress: JSON.stringify(location),
      },
    });
  }
}

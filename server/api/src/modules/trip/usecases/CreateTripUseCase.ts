import { Injectable, Inject } from "@nestjs/common";
import { PrismaService } from "src/infra/Prisma/prisma.module";
import { UseCase } from "src/shared/interfaces/UseCases";
import CreateTripDto from "../dto/createTripDto";
import CreateLocationUseCase from "src/modules/location/usecases/CreateLocationUseCase";
import { calculateDistance } from "src/shared/util";

interface CreateTripInput {
  userId: string;
  data: CreateTripDto;
}

@Injectable()
export default class CreateTripUseCase implements UseCase<
  CreateTripInput,
  any
> {
  constructor(
    private readonly prisma: PrismaService,
    private readonly createLocation: CreateLocationUseCase,
  ) {}

  async execute({ userId, data }: CreateTripInput) {
    const now = new Date();
    const driver = await this.prisma.driverProfile.findUnique({
      where: {
        userId,
      },
    });

    if (
      !data.originLat ||
      !data.originLog ||
      !data.destinationLat ||
      !data.destinationLog
    ) {
      throw new Error("Coordenadas de origem e destino são obrigatórias");
    }

    if (
      data.originLat === data.destinationLat &&
      data.originLog === data.destinationLog
    ) {
      throw new Error("Origem e destino não podem ser iguais");
    }

    if (!driver) {
      throw new Error("Usuário não possui perfil de motorista");
    }

    if (driver.requestStatus !== "APPROVED") {
      throw new Error("Motorista ainda não foi aprovado");
    }

    const vehicle = await this.prisma.vehicle.findFirst({
      where: {
        id: data.vehicleId,
        driverId: driver.id,
      },
      include: {
        documents: true,
      },
    });

    if (!vehicle) {
      throw new Error("Veículo não encontrado ou não pertence ao motorista");
    }

    const validDocuments = vehicle.documents.filter(
      (doc) => doc.verified && (!doc.expiresAt || doc.expiresAt > now),
    );

    if (validDocuments.length !== vehicle.documents.length) {
      throw new Error(
        "Veículo possui documentos pendentes, inválidos ou expirados",
      );
    }

    const seats = data.publishedSeats ?? vehicle.passengerSeats;

    if (seats > vehicle.passengerSeats) {
      throw new Error("Quantidade de lugares excede a capacidade do veículo");
    }

    const [origin, destination] = await Promise.all([
      this.createLocation.execute({
        latitude: data.originLat,
        longitude: data.originLog,
      }),

      this.createLocation.execute({
        latitude: data.destinationLat,
        longitude: data.destinationLog,
      }),
    ]);

    const distanceKm = calculateDistance(
      origin.latitude,
      origin.longitude,
      destination.latitude,
      destination.longitude,
    );

    if (distanceKm < 1) {
      throw new Error("A distância da viagem é inválida");
    }

    const trip = await this.prisma.trip.create({
      data: {
        driverId: driver.id,
        vehicleId: data.vehicleId,
        originId: origin.id,
        destinationId: destination.id,
        name: data.name,
        departureTime: data.departureDate,
        departureDate: data.departureTime,
        publishedSeats: seats,
        priceBase: data.priceBase,
        status: "DRAFT",
        distanceKm,
      },
      include: {
        origin: true,
        destination: true,
        vehicle: true,
        stops: true,
        bookings: true,
      },
    });

    return trip;
  }
}

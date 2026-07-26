import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/infra/Prisma/prisma.module";
import { UseCase } from "src/shared/interfaces/UseCases";
import CreateBookingDto from "../dto/CreateBookingDto";
import CreateLocationUseCase from "src/modules/location/usecases/CreateLocationUseCase";
import { calculateDistance } from "src/shared/util";

@Injectable()
export default class CreateBookingUseCase implements UseCase<
  CreateBookingDto & { userId: string },
  any
> {
  constructor(
    private readonly prisma: PrismaService,

    private readonly createLocation: CreateLocationUseCase,
  ) {}

  async execute(data: CreateBookingDto & { userId: string }) {
    const { userId, seats, tripId } = data;

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

    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    if (user.status !== "ACTIVE") {
      throw new Error("Usuário não está activo");
    }

    const trip = await this.prisma.trip.findUnique({
      where: {
        id: tripId,
      },

      include: {
        driver: {
          include: {
            user: true,
          },
        },

        bookings: true,
      },
    });

    if (!trip) {
      throw new Error("Viagem não encontrada");
    }

    if (trip.status !== "PUBLISHED") {
      throw new Error("Esta viagem não está disponível");
    }

    const departure = new Date(
      `${trip.departureDate.toISOString().split("T")[0]}T${trip.departureDate.toISOString().split("T")[1]}`,
    );

    if (departure <= new Date()) {
      throw new Error("Esta viagem já iniciou ou expirou");
    }

    if (trip.driver.userId === userId) {
      throw new Error("Não pode reservar a própria viagem");
    }

    const alreadyBooked = trip.bookings.find(
      (booking) =>
        booking.passengerId === userId && booking.status !== "CANCELLED",
    );

    if (alreadyBooked) {
      throw new Error("Já possui uma reserva nesta viagem");
    }

    const occupiedSeats = trip.bookings
      .filter((booking) => booking.status !== "CANCELLED")
      .reduce((total, booking) => total + booking.seats, 0);

    const availableSeats = trip.publishedSeats - occupiedSeats;

    if (seats > availableSeats) {
      throw new Error(`Apenas ${availableSeats} lugares disponíveis`);
    }

    const [pickupLocation, dropLocation] = await Promise.all([
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
      pickupLocation.latitude,
      pickupLocation.longitude,
      dropLocation.latitude,
      dropLocation.longitude,
    );

    if (distanceKm < 1) {
      throw new Error("A distância da viagem é inválida");
    }

    const booking = await this.prisma.booking.create({
      data: {
        tripId,
        passengerId: userId,
        seats,
        status: "PENDING",
        price: Number(trip.priceBase) * seats,
      },

      include: {
        trip: {
          include: {
            origin: true,
            destination: true,
          },
        },
      },
    });

    await this.prisma.tripStop.createMany({
      data: [
        {
          tripId,
          bookingId: booking.id,
          locationId: pickupLocation.id,
          order: 1,
          type: "PICK",
        },

        {
          tripId,
          bookingId: booking.id,
          locationId: dropLocation.id,
          order: 2,
          type: "DROP",
        },
      ],
    });
    return {
      booking,
      pickupLocation,
      dropLocation,
    };
  }
}

import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/infra/Prisma/prisma.module";
import { UseCase } from "src/shared/interfaces/UseCases";
import CreateReportDto from "../dto/CreateReportDto";

interface CreateReportInput extends CreateReportDto {
  reporterId: string;
}

@Injectable()
export default class CreateReportUseCase implements UseCase<
  CreateReportInput,
  any
> {
  constructor(private readonly prisma: PrismaService) {}

  async execute(data: CreateReportInput) {
    const booking = await this.prisma.booking.findUnique({
      where: {
        id: data.bookingId,
      },

      include: {
        trip: true,
      },
    });

    if (!booking) {
      throw new Error("Reserva não encontrada");
    }

    if (
      booking.passengerId !== data.reporterId &&
      booking.trip.driverId !== data.reporterId
    ) {
      throw new Error("Não possui permissão para reclamar desta viagem");
    }

    return this.prisma.report.create({
      data: {
        reporterId: data.reporterId,

        targetUserId: data.targetUserId,

        bookingId: data.bookingId,

        type: data.type,

        title: data.title,

        description: data.description,
      },
    });
  }
}

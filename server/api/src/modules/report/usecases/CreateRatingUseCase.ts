import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/infra/Prisma/prisma.module";
import { UseCase } from "src/shared/interfaces/UseCases";
import CreateRatingDto from "../dto/CreateRatingDto";

interface CreateRatingInput extends CreateRatingDto {
  fromUserId: string;
}

@Injectable()
export default class CreateRatingUseCase implements UseCase<
  CreateRatingInput,
  any
> {
  constructor(private readonly prisma: PrismaService) {}

  async execute(data: CreateRatingInput) {
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

    if (booking.status !== "COMPLETED") {
      throw new Error("Só pode avaliar após concluir a viagem");
    }

    if (data.fromUserId === data.toUserId) {
      throw new Error("Não pode avaliar a si próprio");
    }

    return this.prisma.rating.create({
      data: {
        bookingId: data.bookingId,

        fromUserId: data.fromUserId,

        toUserId: data.toUserId,

        target: data.target,

        stars: data.stars,

        comment: data.comment,
      },
    });
  }
}

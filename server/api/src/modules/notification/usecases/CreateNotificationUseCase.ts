import { Injectable } from "@nestjs/common";
import { NotificationType } from "@prisma/client";
import { PrismaService } from "src/infra/Prisma/prisma.module";
import { UseCase } from "src/shared/interfaces/UseCases";

interface CreateNotificationInput {
  userId: string;
  title: string;
  message: string;
  type: NotificationType;
}

@Injectable()
export default class CreateNotificationUseCase implements UseCase<
  CreateNotificationInput,
  any
> {
  constructor(private readonly prisma: PrismaService) {}

  async execute(data: CreateNotificationInput) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: data.userId,
      },
    });

    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    if (user.status !== "ACTIVE") {
      throw new Error("Usuário inativo");
    }

    return this.prisma.notification.create({
      data: {
        userId: data.userId,
        title: data.title,
        message: data.message,
        type: data.type,
      },
    });
  }
}

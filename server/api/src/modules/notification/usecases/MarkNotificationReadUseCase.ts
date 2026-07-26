import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/infra/Prisma/prisma.module";
import { UseCase } from "src/shared/interfaces/UseCases";

interface MarkNotificationReadInput {
  userId: string;
  notificationId: string;
}

@Injectable()
export class MarkNotificationReadUseCase implements UseCase<
  MarkNotificationReadInput,
  any
> {
  constructor(private readonly prisma: PrismaService) {}

  async execute({ userId, notificationId }: MarkNotificationReadInput) {
    const notification = await this.prisma.notification.findFirst({
      where: {
        id: notificationId,
        userId,
      },
    });

    if (!notification) {
      throw new Error("Notificação não encontrada");
    }

    if (notification.read) {
      return notification;
    }

    return this.prisma.notification.update({
      where: {
        id: notificationId,
      },
      data: {
        read: true,
      },
    });
  }
}

interface MarkAllNotificationsReadInput {
  userId: string;
}

@Injectable()
export class MarkAllNotificationsReadUseCase implements UseCase<
  MarkAllNotificationsReadInput,
  void
> {
  constructor(private readonly prisma: PrismaService) {}

  async execute({ userId }: MarkAllNotificationsReadInput): Promise<void> {
    await this.prisma.notification.updateMany({
      where: {
        userId,
        read: false,
      },
      data: {
        read: true,
      },
    });
  }
}

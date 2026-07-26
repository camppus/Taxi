import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/infra/Prisma/prisma.module";
import { UseCase } from "src/shared/interfaces/UseCases";

interface GetNotificationsInput {
  userId: string;
  cursor?: string;
  limit?: number;
}

@Injectable()
export default class GetNotificationsUseCase implements UseCase<
  GetNotificationsInput,
  any
> {
  constructor(private readonly prisma: PrismaService) {}

  async execute({ userId, cursor, limit = 20 }: GetNotificationsInput) {
    const notifications = await this.prisma.notification.findMany({
      where: {
        userId,
      },

      orderBy: {
        createdAt: "desc",
      },

      take: limit + 1,

      ...(cursor && {
        cursor: {
          id: cursor,
        },
        skip: 1,
      }),
    });

    const hasNext = notifications.length > limit;

    const items = hasNext ? notifications.slice(0, limit) : notifications;

    await this.prisma.notification.updateMany({
      where: {
        id: {
          in: items.map((item) => item.id),
        },
      },
      data: {
        read: true,
      },
    });

    return {
      data: items.map((item) => ({
        ...item,
        read: true,
      })),

      nextCursor: hasNext ? items[items.length - 1].id : null,

      hasNext,
    };
  }
}

import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/infra/Prisma/prisma.module";
import { UseCase } from "src/shared/interfaces/UseCases";

interface HasUnreadNotificationsInput {
  userId: string;
}

interface HasUnreadNotificationsResponse {
  hasUnread: boolean;
  count: number;
}

@Injectable()
export default class HasUnreadNotificationsUseCase implements UseCase<
  HasUnreadNotificationsInput,
  HasUnreadNotificationsResponse
> {
  constructor(private readonly prisma: PrismaService) {}

  async execute({
    userId,
  }: HasUnreadNotificationsInput): Promise<HasUnreadNotificationsResponse> {
    const count = await this.prisma.notification.count({
      where: {
        userId,
        read: false,
      },
    });

    return {
      hasUnread: count > 0,
      count,
    };
  }
}

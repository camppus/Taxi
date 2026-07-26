import { Inject, Injectable } from "@nestjs/common";
import { UseCase } from "src/shared/interfaces/UseCases";
import type { NotificationProvider } from "../providers/NotificationProvider";

interface PublishNotificationInput {
  userId: string;
  notification: {
    id: string;
    title: string;
    message: string;
    type: string;
    createdAt: Date;
  };
}

@Injectable()
export default class PublishNotificationUseCase implements UseCase<
  PublishNotificationInput,
  void
> {
  constructor(
    @Inject("NotificationProvider")
    private readonly notificationProvider: NotificationProvider,
  ) {}

  async execute({
    userId,
    notification,
  }: PublishNotificationInput): Promise<void> {
    await this.notificationProvider.publish({
      createdAt: notification.createdAt,
      id: notification.id,
      message: notification.message,
      title: notification.title,
      read: false,
      userId,
      type: notification.type,
    });
  }
}

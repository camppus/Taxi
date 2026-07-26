import { Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";

import CreateNotificationDto from "../../dto/CreateNotificationDto";
import CreateNotificationUseCase from "../../usecases/CreateNotificationUseCase";
import NotificationDispatcherProvider from "../../NotificationDispatcherProvider";

@Injectable()
export default class NotificationListener {
  constructor(
    private readonly createNotificationUseCase: CreateNotificationUseCase,

    private readonly dispatcher: NotificationDispatcherProvider,
  ) {}

  @OnEvent("notification.create")
  async handle(payload: CreateNotificationDto) {
    const notification = await this.createNotificationUseCase.execute(payload);

    await this.dispatcher.publish({
      id: notification.id,
      userId: notification.userId,
      title: notification.title,
      message: notification.message,
      type: notification.type,
      read: notification.read,
      createdAt: notification.createdAt,
    });
  }
}

import { Inject, Injectable } from "@nestjs/common";
import {
  NotificationPayload,
  type NotificationProvider,
} from "./providers/NotificationProvider";

@Injectable()
export default class NotificationDispatcherProvider implements NotificationProvider {
  constructor(
    @Inject("NotificationProviders")
    private readonly providers: NotificationProvider,
  ) {}

  async publish(notification: NotificationPayload): Promise<void> {
    await this.providers.publish(notification);
  }
}

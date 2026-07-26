import { Injectable } from "@nestjs/common";
import {
  NotificationPayload,
  NotificationProvider,
} from "./NotificationProvider";

@Injectable()
export default class PushNotificationProvider implements NotificationProvider {
  async publish(notification: NotificationPayload): Promise<void> {
    /**
     * Futuramente:
     *
     * Firebase Cloud Messaging
     * APNs
     * Expo
     * OneSignal
     *
     */

    console.log(`[PUSH] ${notification.userId}: ${notification.title}`);
  }
}

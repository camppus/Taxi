import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Expo } from 'expo-server-sdk';
import {
  NotificationPayload,
  NotificationProvider,
} from '../notificationModule.js';
@Injectable()
export class ExpoNotificationProvider implements NotificationProvider {
  private readonly logger = new Logger(ExpoNotificationProvider.name);
  private readonly expo!: Expo;

  constructor(private readonly configService: ConfigService) {
    const accessToken = this.configService.get<string>('EXPO_ACCESS_TOKEN');

    if (!accessToken) {
      this.logger.fatal('EXPO_ACCESS_TOKEN não configurado');
      throw new Error('EXPO_ACCESS_TOKEN não configurado');
    }

    this.expo = new Expo({
      accessToken,
    });
  }

  async send(payload: NotificationPayload): Promise<void> {
    if (!Expo.isExpoPushToken(payload.to)) {
      throw new Error(
        `Push token ${payload.to} is not a valid Expo push token`,
      );
    }
    const message = {
      to: payload.to,
      title: payload.title,
      body: payload.body,
      data: payload.data,
      sound: 'default' as const,
    };

    const tickets = await this.expo.sendPushNotificationsAsync([message]);
    this.logger.debug(
      `Expo notification sent: ${JSON.stringify(tickets[0].status)}`,
    );
  }
}

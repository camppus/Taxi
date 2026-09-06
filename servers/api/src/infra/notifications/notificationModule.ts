import { Global, Module } from '@nestjs/common';
import { ExpoNotificationProvider } from './providers/ExpoNotificationProvider.js';

export interface NotificationPayload {
  to: string;
  title: string;
  body: string;
  data?: Record<string, unknown>;
}

export interface NotificationProvider {
  send(payload: NotificationPayload): Promise<void>;
}

@Global()
@Module({
  providers: [
    {
      provide: 'NotificationProvider',
      useClass: ExpoNotificationProvider,
    },
  ],
  exports: ['NotificationProvider'],
})
export default class NotificationModule {}

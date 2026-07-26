import { Module } from "@nestjs/common";

import { EventEmitterModule } from "@nestjs/event-emitter";

import { NotificationController } from "./NotificationController";

import HasUnreadNotificationsUseCase from "./usecases/HasUnreadNotificationsUseCase";

import {
  MarkAllNotificationsReadUseCase,
  MarkNotificationReadUseCase,
} from "./usecases/MarkNotificationReadUseCase";

import CreateNotificationUseCase from "./usecases/CreateNotificationUseCase";
import NotificationListener from "./infra/listners/NotificationListener";
import NotificationDispatcherProvider from "./NotificationDispatcherProvider";
import PushNotificationProvider from "./providers/PushNotificationProvider";
import GetNotificationsUseCase from "./usecases/GetNotificationsUseCase";

@Module({
  imports: [EventEmitterModule.forRoot()],
  controllers: [NotificationController],
  providers: [
    CreateNotificationUseCase,
    HasUnreadNotificationsUseCase,
    MarkNotificationReadUseCase,
    MarkAllNotificationsReadUseCase,
    NotificationListener,
    NotificationDispatcherProvider,
    PushNotificationProvider,
    GetNotificationsUseCase,

    {
      provide: "NotificationProviders",
      useClass: PushNotificationProvider,
    },
  ],

  exports: [CreateNotificationUseCase, NotificationDispatcherProvider],
})
export class NotificationModule {}

import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { MessagingProvider } from '../messagingModule.js';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';

@Injectable()
export default class InMemoryMessagingProvider
  implements OnModuleInit, MessagingProvider
{
  private readonly logger = new Logger(InMemoryMessagingProvider.name);
  constructor(private readonly eventEmmiter: EventEmitter2) {}

  async onModuleInit() {
    this.publish('ping.service', {
      value: 'pong',
    });
  }

  @OnEvent('ping.service')
  handleOrderCreatedEvent(payload: { value: string }) {
    this.logger.verbose(payload.value);
  }

  publish(key: string, value: any): void {
    this.eventEmmiter.emit(key, value);
  }
}

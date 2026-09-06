import { Global, Module } from '@nestjs/common';
import InMemoryMessagingProvider from './providers/InMemoryMessagingProvider.js';

export interface MessagingProvider {
  publish(key: string, value: any): void;
}

@Global()
@Module({
  providers: [
    {
      provide: 'MessagingProvider',
      useClass: InMemoryMessagingProvider,
    },
  ],

  exports: ['MessagingProvider'],
})
export default class MessagingModule {}

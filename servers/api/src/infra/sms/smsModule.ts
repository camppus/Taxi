import { Module } from '@nestjs/common';
import SmsHub from './providers/SmsHub.js';

export interface SmsProvider {
  send(data: { to: string; message: string }): Promise<void>;
}

@Module({
  providers: [
    {
      provide: 'SmsProvider',
      useClass: SmsHub,
    },
  ],
  exports: ['SmsProvider'],
})
export default class SmsModule {}

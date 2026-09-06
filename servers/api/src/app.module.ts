import { Module } from '@nestjs/common';
import { createObserveModule } from '@nestjs/observe';
import { DrizzleModule } from './infra/persistence/drizzle/drizzleModule.js';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ScheduleModule } from '@nestjs/schedule';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { JwtModule } from '@nestjs/jwt';
import CacheModule from './infra/caching/CacheProvider.js';
import SmsModule from './infra/sms/smsModule.js';
import MessagingModule from './infra/messaging/messagingModule.js';
import StorageModule from './infra/storage/storageModule.js';
import SecurityModule from './infra/security/securityModule.js';
export const { ObserveModule, ObserveInstrument } = createObserveModule();

@Module({
  imports: [
    ObserveModule.forRoot({
      appKey: process.env.OBSERVE_APP_KEY!,
      appSecret: process.env.OBSERVE_APP_SECRET!,
      serviceId: process.env.OBSERVE_SERVICE_ID!,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ScheduleModule.forRoot(),
    EventEmitterModule.forRoot({
      global: true,
      delimiter: '.',
    }),
    ThrottlerModule.forRoot([
      {
        name: 'short',
        ttl: 1000,
        limit: 3,
      },
      {
        name: 'medium',
        ttl: 10000,
        limit: 20,
      },
      {
        name: 'long',
        ttl: 60000,
        limit: 100,
      },
    ]),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET!,
      signOptions: { expiresIn: '1h' },
    }),
    DrizzleModule,
    CacheModule,
    SmsModule,
    MessagingModule,
    StorageModule,
    SecurityModule,
  ],
})
export class AppModule {}

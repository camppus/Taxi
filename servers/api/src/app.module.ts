import { Module } from '@nestjs/common';
import { createObserveModule } from '@nestjs/observe';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { DrizzleModule } from './infra/persistence/drizzle/drizzleModule.js';

export const { ObserveModule, ObserveInstrument } = createObserveModule();

@Module({
  imports: [
    ObserveModule.forRoot({
      appKey: process.env.OBSERVE_APP_KEY!,
      appSecret: process.env.OBSERVE_APP_SECRET!,
      serviceId: process.env.OBSERVE_SERVICE_ID!,
    }),
    DrizzleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

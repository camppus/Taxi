import { MiddlewareConsumer, Module, RequestMethod } from "@nestjs/common";
import { ScheduleModule } from "@nestjs/schedule";
import { ThrottlerModule } from "@nestjs/throttler";
import { ConfigModule } from "@nestjs/config";
import { EventEmitterModule } from "@nestjs/event-emitter";
import { PrometheusModule } from "@willsoto/nestjs-prometheus";
import PrismaModule from "./infra/Prisma/prisma.service";
import { RedisModule } from "./infra/Redis/redis.module";
import SecurityModule from "./infra/security/security.module";
import UserModule from "./modules/user/userModule";
import { SmsModule } from "./infra/Sms/sms.module";
import { DriverModule } from "./modules/driver/driverModule";
import { VehicleModule } from "./modules/vehicle/VehicleModule";
import { LocationModule } from "./modules/location/LocationModule";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60000,
          limit: 10,
        },
      ],
    }),
    EventEmitterModule.forRoot({
      wildcard: false,
      delimiter: ".",
      newListener: false,
      removeListener: false,
      maxListeners: 10,
      verboseMemoryLeak: false,
      ignoreErrors: false,
    }),
    ScheduleModule.forRoot(),
    PrometheusModule.register(),
    PrismaModule,
    RedisModule,
    SecurityModule,
    UserModule,
    SmsModule,
    DriverModule,
    LocationModule,
    VehicleModule,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply((req, res, next) => {
        next();
      })
      .exclude(
        { path: "auth/login", method: RequestMethod.POST },
        { path: "auth/refresh", method: RequestMethod.PUT },
        { path: "auth/recovery", method: RequestMethod.POST },
        { path: "auth/recovery/confirm", method: RequestMethod.PATCH },
        { path: "users", method: RequestMethod.POST },
      )
      .forRoutes("*");
  }
}

import { MiddlewareConsumer, Module, RequestMethod } from "@nestjs/common";
import { ScheduleModule } from "@nestjs/schedule";
import { ThrottlerModule } from "@nestjs/throttler";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { EventEmitterModule } from "@nestjs/event-emitter";
import { PrometheusModule } from "@willsoto/nestjs-prometheus";
import PrismaModule from "./infra/Prisma/prisma.service";
import { RedisModule } from "./infra/Redis/redis.module";
import { EmailModule } from "./infra/email/email.module";
import SecurityModule from "./infra/security/security.module";
import { JwtModule } from "@nestjs/jwt";

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
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>("JWT_ACCESS_SECRET"),
        signOptions: { expiresIn: "1d" },
      }),
    }),
    PrismaModule,
    RedisModule,
    EmailModule,
    SecurityModule,
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

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
import LocationModule from "./modules/location/presenter/locationModule";
import UserModule from "./modules/users/presenter/http/userModule";
import EventModule from "./modules/event/presenter/http/eventModule";
import ContactModule from "./modules/contacts/presenter/http/ContactModule";
import SOSModule from "./modules/sos/presenters/http/SOSModule";
import NotificationModule from "./modules/notifications/presenter/http/NotificationModule";
import AdressModule from "./modules/adress/presenters/http/AdressModule";
import EnterpriseModule from "./modules/enterprise/presenters/http/entepriseModule";
import { JwtModule } from "@nestjs/jwt";
import { AuthModule } from "./modules/auth/infra/http/AuthModule";
import { AuthMiddleware } from "./modules/auth/infra/http/AuthMidlleware";
import DiscountModule from "./modules/discount/presenters/http/DicountModule";
import ConversationModule from "./modules/callcenter/infra/http/conversationModule";
import AuditModule from "./modules/auditories/presenter/http/AuditModule";
import WalletModule from "./modules/wallet/presenter/http/walletModule";

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
    LocationModule,
    UserModule,
    EventModule,
    AdressModule,
    ContactModule,
    SOSModule,
    NotificationModule,
    EnterpriseModule,
    AuthModule,
    WalletModule,
    DiscountModule,
    ConversationModule,
    AuditModule,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
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

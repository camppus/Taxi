import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { apiReference } from "@scalar/nestjs-api-reference";
import { ValidationPipe } from "@nestjs/common";
import helmet from "helmet";
import compression from "compression";
import { GlobalExceptionFilter } from "./infra/http/ExeptionFilter";
import cookieParser from "cookie-parser";
import { AuditInterceptor } from "./modules/auditories/presenter/http/AuditInterceptor";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle("CIS CLIENT API")
    .setVersion("1.0")
    .addBearerAuth()
    .setLicense("MIT", "")
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("swagger-json", app, document);
  app.enableCors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  });

  app.use(cookieParser());
  app.use(
    "/docs",
    apiReference({
      content: document,
      theme: "deepSpace",
      layout: "modern",
    }),
  );
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.use(compression());
  app.use(
    helmet({
      crossOriginEmbedderPolicy: false,
      contentSecurityPolicy: {
        directives: {
          imgSrc: [
            `'self'`,
            "data:",
            "apollo-server-landing-page.cdn.apollographql.com",
          ],
          scriptSrc: [`'self'`, `'unsafe-inline'`],
          manifestSrc: [
            `'self'`,
            "apollo-server-landing-page.cdn.apollographql.com",
          ],
          frameSrc: [`'self'`, "sandbox.embed.apollographql.com"],
        },
      },
    }),
  );
  app.useGlobalFilters(new GlobalExceptionFilter());
  app.useGlobalInterceptors(app.get(AuditInterceptor));
  app.enableShutdownHooks();
  const port = process.env.PORT ?? 8080;
  await app.listen(port, "localhost");
}
bootstrap();

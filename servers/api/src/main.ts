import { NestFactory } from '@nestjs/core';
import { AppModule, ObserveInstrument } from './app.module.js';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { apiReference } from '@scalar/nestjs-api-reference';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import compression from 'compression';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    instrument: ObserveInstrument,
  });
  const config = new DocumentBuilder()
    .setTitle('Ecommerce API')
    .setDescription('Ecommerce API documentation')
    .setVersion('1.0')
    .addTag('ecommerce')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  app.use(
    '/docs',
    apiReference({
      content: document,
      theme: 'deepSpace',
    }),
  );
  app.enableCors();
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.use(helmet());
  app.use(compression());
  app.enableShutdownHooks();
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });
  await app.listen(process.env.PORT ?? 3000);
}
await bootstrap();

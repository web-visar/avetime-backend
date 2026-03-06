import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { RedisIoAdapter } from './core/adapters/redis-io.adapter';
import { ConfigService } from '@nestjs/config';
import { readFileSync } from 'fs';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.use(cookieParser());

  app.enableCors({
    origin: configService.get<string>('CORS_ORIGINS')?.split(';') || [],
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
      validationError: {
        target: false,
        value: false,
      },
    }),
  );

  await initializeWebSocketAdapter(app, configService);

  const port = configService.get<number>('PORT', 3000);
  await app.listen(port, '0.0.0.0');
}
bootstrap();

async function initializeWebSocketAdapter(app: INestApplication<any>, configService: ConfigService) {
  const redisUrl = configService.getOrThrow<string>('REDIS_URL');
  const redisIoAdapter = new RedisIoAdapter(app, redisUrl);
  await redisIoAdapter.connectToRedis();
  app.useWebSocketAdapter(redisIoAdapter);
}

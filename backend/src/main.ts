import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { MainModule } from './main.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(MainModule);
  app.useGlobalPipes(new ValidationPipe({ enableDebugMessages: true }));

  const env = process.env.NODE_ENV;
  if (env === 'DEV') {
    app.enableCors({
      origin: 'http://localhost:3000',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      preflightContinue: false,
      optionsSuccessStatus: 204,
    });
  }
  await app.listen(3001);
}
bootstrap();

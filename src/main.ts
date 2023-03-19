import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const corsOptions = {
  "origin": "https://holiday-web-2.netlify.app",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": false,
  "optionsSuccessStatus": 204
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: corsOptions });
  app.useGlobalPipes(new ValidationPipe(
    {
      whitelist: true,
    }
  ));
  await app.listen(process.env.PORT || 3000);
}
bootstrap();

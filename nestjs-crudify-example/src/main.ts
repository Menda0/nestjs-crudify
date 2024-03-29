import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const globalPrefix = 'todo-api';

  app.setGlobalPrefix(globalPrefix);
  app.enableShutdownHooks();
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  const port = process.env.PORT || 3000;

  await app.listen(port, () => {
    Logger.log(
      `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
    );
  });
}

bootstrap();

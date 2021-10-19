import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerDocumentOptions,
  SwaggerModule,
} from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Attrecto Academy 2021 API')
    .setDescription('The Attrecto Academy 2021 API description')
    .setVersion('1.0')
    .build();

  const options: SwaggerDocumentOptions = {
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
  };
  const customOptions: SwaggerCustomOptions = {
    customSiteTitle: 'Attrecto Academy 2021',
  };

  const document = SwaggerModule.createDocument(app, config, options);
  SwaggerModule.setup('swagger', app, document, customOptions);

  await app.listen(3000);
}

bootstrap();

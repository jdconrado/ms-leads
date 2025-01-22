import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger, LogLevel, ValidationPipe } from '@nestjs/common';
import { APP_VARIABLES } from '@config/app-variables.config';
import { writeFileSync } from 'fs';
import { join } from 'path';

const getLoggerLevels = (): LogLevel[] => {
  const logLevel = APP_VARIABLES.LOG_LEVEL;
  switch (logLevel) {
    case 'debug':
      return ['error', 'warn', 'log', 'debug'];
    case 'info':
      return ['error', 'warn', 'log'];
    case 'error':
      return ['error'];
    case 'warn':
      return ['error', 'warn'];
    case 'verbose':
      return ['error', 'warn', 'log', 'debug', 'verbose'];
    case 'fatal':
      return ['error', 'fatal'];
    case 'silent':
      return [];
    default:
      return ['error', 'warn', 'log'];
  }
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: true,
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      preflightContinue: false,
      credentials: true,
    },
    logger: getLoggerLevels(),
  });

  const config = new DocumentBuilder()
    .setTitle('Leads API')
    .setDescription('Leads related operations api')
    .setVersion('1.0')
    .addTag('leads')
    .build();
  const document = SwaggerModule.createDocument(app, config, {
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
  });
  SwaggerModule.setup('api', app, document);

  if (['local', 'ci'].includes(APP_VARIABLES.NODE_ENV)) {
    // Save the OpenAPI document to a file
    writeFileSync(
      join(__dirname, '../../docs/openapi.json'),
      JSON.stringify(document, null, 2),
    );
  }

  const appSettings = APP_VARIABLES;
  const logger = new Logger('bootstrap');
  logger.warn(
    `Application is running on: ${appSettings.NODE_ENV} mode - ${appSettings.APP_URL}:${appSettings.APP_PORT}`,
  );

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  await app.listen(appSettings.APP_PORT);
}
bootstrap();

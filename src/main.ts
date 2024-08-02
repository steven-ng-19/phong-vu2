import * as compression from 'compression';
import * as express from 'express';

import { CONFIG_VAR, DEFAULT_PORT } from '@config/index';
import { INestApplication, Logger, VersioningType } from '@nestjs/common';

import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';
import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';

async function getApp() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors();
  app.use(compression());
  app.use(helmet());
  app.use(
    express.json({
      verify: (req, res, buffer) => (req['rawBody'] = buffer),
    }),
  );

  // app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  app.setGlobalPrefix('/api');
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  return app;
}

async function seedData(app: INestApplication) {
  // Create default admin
  // const authService = app.get(AuthService);
  // await authService.createDefaultAdmin();
}

async function bootstrapServer() {
  const app = await getApp();

  // Seed data
  // await seedData(app);

  // Setup Swagger
  // setupSwagger(app);

  // Start server
  const configService = app.get(ConfigService);
  const port = configService.get(CONFIG_VAR.PORT, DEFAULT_PORT);

  await app.listen(port, () => {
    const logger = new Logger(AppModule.name);
    logger.log(`Application is running on port ${port}`);
  });
}

bootstrapServer();

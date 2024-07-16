import { PORT } from '@common/constants';
import { UsersService } from '@modules/users/services/users.service';
import { VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as compression from 'compression';
import helmet from 'helmet';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors();
  app.use(compression());
  app.use(helmet());

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
    prefix: 'api/v',
  });

  // Create default admin user
  const usersService = app.get(UsersService);
  await usersService.createDefaultAdminUser();

  const configService = app.get(ConfigService);
  const port = configService.get<number>(PORT);

  await app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });
}
bootstrap();

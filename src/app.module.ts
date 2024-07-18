import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AllExceptionsFilter } from '@common/filters';
import { CONFIG_VAR } from './configs';
import { ConfigSchema } from '@config/config.schema';
import { Environment } from '@common/enums';
import { Module } from '@nestjs/common';
import { ResponseTransformInterceptor } from '@common/interceptors';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV || Environment.DEVELOPMENT}`,
      isGlobal: true,
      cache: true,
      validationSchema: ConfigSchema,
    }),

    // Shared modules

    // Feature modules,

    // Realtime
  ],
  controllers: [],
  providers: [
    { provide: APP_FILTER, useClass: AllExceptionsFilter },
    { provide: APP_INTERCEPTOR, useClass: ResponseTransformInterceptor },
  ],
})
export class AppModule {}

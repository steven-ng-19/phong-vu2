import { configValidate } from '@common/configs';
import {
  MONGODB_URI,
  REDIS_HOST,
  REDIS_PASSWORD,
  REDIS_PORT,
} from '@common/constants';
import { AllExceptionsFilter } from '@common/filters';
import { TransformInterceptor } from '@common/interceptors';
import { AuthModule } from '@modules/auth/auth.module';
import { CategoriesModule } from '@modules/categories/categories.module';
import { OrdersModule } from '@modules/orders/orders.module';
import { ProductsModule } from '@modules/products/products.module';
import { PromotionsModule } from '@modules/promotions/promotions.module';
import { UploadModule } from '@modules/upload/upload.module';
import { UsersModule } from '@modules/users/users.module';
import { WishlistModule } from '@modules/wishlist/wishlist.module';
import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { FirseBaseModule } from '@shared/firsebase/firsebase.module';
import { StripeModule } from '@shared/stripe/stripe.module';
import { TwilioModule } from '@shared/twilio/twilio.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
      cache: true,
      load: [() => configValidate],
    }),

    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          uri: configService.get<string>(MONGODB_URI),
          useNewUrlParser: true,
        };
      },
    }),

    BullModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          redis: {
            host: configService.get<string>(REDIS_HOST),
            port: configService.get<number>(REDIS_PORT),
            password: configService.get<string>(REDIS_PASSWORD),
          },
        };
      },
    }),

    // Featured
    UsersModule,
    AuthModule,
    CategoriesModule,
    ProductsModule,
    UploadModule,
    OrdersModule,
    WishlistModule,
    PromotionsModule,

    // Shared
    FirseBaseModule,
    StripeModule,
    TwilioModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_INTERCEPTOR, useClass: TransformInterceptor },
    { provide: APP_FILTER, useClass: AllExceptionsFilter },
  ],
})
export class AppModule {}

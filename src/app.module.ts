import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { ClerkWebhookModule, StripeWebHookModule } from './webhooks';

import { AddressModule } from '@modules/addresses/address.module';
import { AllExceptionsFilter } from '@common/filters';
import { AppController } from './app.controller';
import { AuthModule } from '@modules/auth/auth.module';
import { CartModule } from '@modules/carts/cart.module';
import { CategoryModule } from '@modules/categories/category.module';
import { ClerkModule } from '@shared/clerk/clerk.module';
import { ConfigModule } from '@nestjs/config';
import { ConfigSchema } from '@config/config.schema';
import { Environment } from '@common/enums';
import { Module } from '@nestjs/common';
import { OrderModule } from '@modules/orders/order.module';
import { PaymentModule } from '@modules/payments/payment.module';
import { PrismaModule } from '@shared/prisma/prisma.module';
import { ProductModule } from '@modules/products/product.module';
import { PromotionModule } from '@modules/promotions/promotion.module';
import { QueueModule } from '@shared/queue/queue.module';
import { ResponseModule } from '@shared/response/response.module';
import { ResponseTransformInterceptor } from '@common/interceptors';
import { SendMailModule } from '@shared/email/send-mail.module';
import { StripeModule } from '@shared/stripe/stripe.module';
import { UserModule } from '@modules/users/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV || Environment.DEVELOPMENT}`,
      isGlobal: true,
      cache: true,
      validate(config) {
        return ConfigSchema.parse(config);
      },
    }),

    // Shared modules

    PrismaModule,
    ResponseModule,
    SendMailModule,
    QueueModule,
    ClerkModule,
    StripeModule,

    // Feature modules,
    AuthModule,
    UserModule,
    AddressModule,
    CategoryModule,
    ProductModule,
    CartModule,
    OrderModule,
    PromotionModule,
    PaymentModule,

    // Webhook
    ClerkWebhookModule,
    StripeWebHookModule,
  ],
  controllers: [AppController],
  providers: [
    { provide: APP_FILTER, useClass: AllExceptionsFilter },
    { provide: APP_INTERCEPTOR, useClass: ResponseTransformInterceptor },
  ],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { OrderModule } from '@modules/orders/order.module';
import { StripeModule } from '@shared/stripe/stripe.module';
import { StripeWebHookController } from './controllers';
import { StripeWebhookService } from './services';

@Module({
  imports: [StripeModule, OrderModule],
  controllers: [StripeWebHookController],
  providers: [StripeWebhookService],
  exports: [],
})
export class StripeWebHookModule {}

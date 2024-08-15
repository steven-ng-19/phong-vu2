import {
  StripeWebHookConnectController,
  StripeWebHookController,
} from './controllers';

import { Module } from '@nestjs/common';
import { OrderModule } from '@modules/orders/order.module';
import { StripeModule } from '@shared/stripe/stripe.module';
import { StripeWebhookService } from './services';

@Module({
  imports: [StripeModule, OrderModule],
  controllers: [StripeWebHookController, StripeWebHookConnectController],
  providers: [StripeWebhookService],
  exports: [],
})
export class StripeWebHookModule {}

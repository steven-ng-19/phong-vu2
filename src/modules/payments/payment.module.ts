import { Module } from '@nestjs/common';
import { OrderModule } from '@modules/orders/order.module';
import { PaymentController } from './controllers';
import { PaymentService } from './services';
import { StripeModule } from '@shared/stripe/stripe.module';
import { UserModule } from '@modules/users/user.module';

@Module({
  imports: [OrderModule, StripeModule, UserModule],
  controllers: [PaymentController],
  providers: [PaymentService],
  exports: [],
})
export class PaymentModule {}

import { BadRequestException, Injectable } from '@nestjs/common';

import { CreatePaymentDto } from '../dtos';
import { OrderService } from '@modules/orders/services';
import { PAYMENT_ERRORS } from 'src/content/errors';
import { StripeService } from '@shared/stripe/stripe.service';
import { UserService } from '@modules/users/services';

@Injectable()
export class PaymentService {
  constructor(
    private readonly _orderService: OrderService,
    private readonly _stripeService: StripeService,
    private readonly _userService: UserService,
  ) {}

  async createPaymentIntent(
    data: CreatePaymentDto,
  ): Promise<{ clientSecret: string; paymentIntentId: string }> {
    const { userId, customerId, firstName, lastName, phone, email, ...rest } =
      data;

    let stripeCustomerId = customerId;

    if (!customerId) {
      const stripeCustomer = await this._stripeService.createCustomer({
        firstName,
        lastName: lastName ?? '',
        email,
        phone,
        id: userId,
      });

      stripeCustomerId = stripeCustomer.id;

      await this._userService.update(
        {
          id: userId,
        },
        {
          customerId: stripeCustomer.id,
        },
      );
    }

    const result = await this._orderService.create(userId, rest);

    if (!result.success)
      throw new BadRequestException(PAYMENT_ERRORS.ERROR_WHEN_CREATE);

    const paymentIntent = await this._stripeService.createPaymentIntent({
      amount: result.totalPriceInOrder,
      metadata: {
        orderId: result.orderId,
      },
      customerId: stripeCustomerId as string,
    });

    if (!paymentIntent) this._orderService.delete({ id: result.orderId });

    return {
      clientSecret: paymentIntent.client_secret as string,
      paymentIntentId: paymentIntent.id as string,
    };
  }
}

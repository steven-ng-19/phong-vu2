import { BadRequestException, Injectable } from '@nestjs/common';

import { CONFIG_VAR } from '@config/config.constant';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
import { User } from '@prisma/client';

@Injectable()
export class StripeService {
  private _stripe: Stripe;
  constructor(private readonly _configService: ConfigService) {
    this._stripe = new Stripe(
      this._configService.getOrThrow(CONFIG_VAR.STRIPE_SECRET_KEY),
      {
        apiVersion: '2024-06-20',
      },
    );
  }

  constructorEvent(
    req: Buffer | undefined,
    sign: string,
    secret: string,
  ): Stripe.Event {
    return this._stripe.webhooks.constructEvent(req as Buffer, sign, secret);
  }

  async createCustomer(
    user: Pick<User, 'firstName' | 'lastName' | 'email' | 'phone' | 'id'>,
  ): Promise<Stripe.Customer> {
    const params: Stripe.CustomerCreateParams = {
      name: `${user.firstName} ${user.lastName}`,
      email: user.email,
      phone: user.phone,
      metadata: {
        userId: user.id,
      },
    };

    return this._stripe.customers.create(params);
  }

  async createSetupIntent(customerId: string): Promise<Stripe.SetupIntent> {
    const params: Stripe.SetupIntentCreateParams = {
      customer: customerId,
      payment_method_types: ['bancontact', 'card', 'ideal'],
    };

    return this._stripe.setupIntents.create(params);
  }

  async getListPaymentMethods(
    customerId: string,
  ): Promise<Stripe.ApiListPromise<Stripe.PaymentMethod>> {
    const params: Stripe.PaymentMethodListParams = {
      customer: customerId,
      type: 'card',
    };

    return this._stripe.paymentMethods.list(params);
  }

  async detachPaymentMethod(
    paymentMethodId: string,
  ): Promise<Stripe.Response<Stripe.PaymentMethod>> {
    return this._stripe.paymentMethods.detach(paymentMethodId);
  }

  async createPaymentIntent({
    customerId,
    // paymentMethodId,
    amount,
    metadata = {},
    confirm = false,
  }: {
    customerId: string;
    // paymentMethodId?: string;
    amount: number;
    metadata: Stripe.MetadataParam;
    confirm?: boolean;
  }): Promise<Stripe.Response<Stripe.PaymentIntent>> {
    try {
      const params: Stripe.PaymentIntentCreateParams = {
        amount: amount * 100,
        currency: 'usd',
        customer: customerId,
        // payment_method: paymentMethodId,
        metadata,
        confirm,
      };

      return this._stripe.paymentIntents.create(params);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}

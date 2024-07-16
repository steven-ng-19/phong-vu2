import { STRIPE_SECRET_KEY } from '@common/constants';
import { User } from '@modules/users/models';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';

@Injectable()
export class StripeService {
  private stripe: Stripe;

  constructor(private configService: ConfigService) {
    this.stripe = new Stripe(
      this.configService.get<string>(STRIPE_SECRET_KEY),
      {
        apiVersion: '2020-08-27',
      },
    );
  }

  async createCustomer(user: User): Promise<Stripe.Customer> {
    const params: Stripe.CustomerCreateParams = {
      name: `${user.firstName} ${user.lastName}`,
      email: user.email,
      phone: user.phone,
      metadata: {
        userId: user._id.toString(),
      },
    };

    return this.stripe.customers.create(params);
  }

  async createSetupIntent(customerId: string): Promise<Stripe.SetupIntent> {
    const params: Stripe.SetupIntentCreateParams = {
      customer: customerId,
      payment_method_types: ['bancontact', 'card', 'ideal'],
    };

    return this.stripe.setupIntents.create(params);
  }

  async getListPaymentMethods(customerId: string): Promise<any> {
    const params: Stripe.PaymentMethodListParams = {
      customer: customerId,
      type: 'card',
    };

    return this.stripe.paymentMethods.list(params);
  }

  async detachPaymentMethod(paymentMethodId: string): Promise<any> {
    return this.stripe.paymentMethods.detach(paymentMethodId);
  }

  async createPaymentIntent({
    customerId,
    paymentMethodId,
    amount,
    metadata = {},
    confirm = true,
  }: {
    customerId: string;
    paymentMethodId: string;
    amount: number;
    metadata: Stripe.MetadataParam;
    confirm?: boolean;
  }) {
    const params: Stripe.PaymentIntentCreateParams = {
      amount: amount * 100,
      currency: 'aud',
      customer: customerId,
      payment_method: paymentMethodId,
      metadata,
      confirm,
    };

    return this.stripe.paymentIntents.create(params);
  }
}

import * as fs from 'fs';

import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

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
        capture_method: 'automatic',
      };

      const extanalAccount = await this._stripe.accounts.createExternalAccount(
        'acct_1032D82eZvKYlo2C',

        {
          external_account: {
            account_number: '000123456789',
            object: 'bank_account',
            country: 'US',
            currency: 'usd',
            routing_number: '110000000',
            account_holder_name: 'Jenny Rosen',
            account_holder_type: 'individual',
          },
        },
      );

      return this._stripe.paymentIntents.create(params);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async createExternalAccount({
    accountId,
  }: {
    accountId: string;
  }): Promise<Stripe.Response<Stripe.ExternalAccount>> {
    try {
      const params: Stripe.AccountCreateExternalAccountParams = {
        external_account: {
          account_number: '000123456', // Số tài khoản ngân hàng giả
          object: 'bank_account',
          country: 'SG',
          currency: 'sgd',
          routing_number: '7171-001', // Mã ngân hàng giả
          account_holder_name: 'Jenny Rosen',
          account_holder_type: 'individual',
        },
      };

      const extanalAccount = await this._stripe.accounts.createExternalAccount(
        accountId,
        params,
      );

      return extanalAccount;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async createAccount({
    email,
  }: {
    email: string;
  }): Promise<Stripe.Response<Stripe.Account>> {
    try {
      const params: Stripe.AccountCreateParams = {
        email: email,
        business_type: 'individual',
        type: 'custom',
      };

      const account = await this._stripe.accounts.create(params);

      return account;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async getAccount(accountId: string) {
    return (await this._stripe.accounts.retrieve(accountId)).requirements;
  }

  async uploadFile(type: string) {
    const fp = fs.readFileSync('./logo.jpg') as Buffer;

    const upload = await this._stripe.files.create({
      file: {
        data: fp,
        name: 'business_icon',
        type: 'application/octet-stream',
      },
      purpose: type as any,
    });

    return upload;
  }

  async updateAccount(accountId: string): Promise<Stripe.Account> {
    return this._stripe.accounts.update(accountId, {
      business_profile: {
        url: 'https://accessible.stripe.com',
      },
      individual: {
        id_number: '000000000',
        email: 'NnVQz@example.com',
        phone: '+65 6123 4567',
        address: {
          line1: 'address_full_match',
          country: 'SG',
        },
        verification: {
          document: {
            front: 'file_identity_document_success',
            // back: 'file_identity_document_success',
          },
        },
        full_name_aliases: ['Jenny Rosen'],
        dob: {
          day: 1,
          month: 1,
          year: 1900,
        },
        registered_address: {
          line1: 'address_full_match',
        },
      },
      tos_acceptance: {
        date: 1609798905,
        ip: '8.8.8.8',
      },
    });
  }

  async createAccountLink(accountId: string) {
    return this._stripe.accountLinks.create({
      account: accountId,
      type: 'account_onboarding',
      return_url: 'https://stripe.com',
      refresh_url: 'https://stripe.com',
    });
  }
}

import { CONFIG_VAR } from '@config/config.constant';
import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  RawBodyRequest,
  Req,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { StripeService } from '@shared/stripe/stripe.service';
import { webHookHandlers } from '../configs';
import Stripe from 'stripe';
import { OrderService } from '@modules/orders/services';

@Controller('webhook/stripe/your-account')
export class StripeWebHookController {
  constructor(
    private readonly _stripeService: StripeService,
    private readonly _configService: ConfigService,
    private readonly _orderService: OrderService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async createStripeWebhookAction(@Req() req: RawBodyRequest<Request>) {
    const signature = req.headers['stripe-signature'];

    let event: Stripe.Event;

    try {
      event = this._stripeService.constructorEvent(
        req['rawBody'],
        signature,
        this._configService.getOrThrow(CONFIG_VAR.STRIPE_WEB_HOOK_SECRET),
      );

      webHookHandlers[event.type](event.data.object, this._orderService);

      return {
        success: true,
      };
    } catch (error) {
      console.log('Error when handling webhook', error);

      return {
        success: false,
      };
    }
  }
}

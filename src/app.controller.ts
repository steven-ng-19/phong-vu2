import { Body, Controller, Param, Post } from '@nestjs/common';
import { StripeService } from '@shared/stripe/stripe.service';

@Controller()
export class AppController {
  constructor(private readonly _stripeService: StripeService) {}

  @Post('create-account')
  createAccount(@Body() data: { email: string }) {
    return this._stripeService.createAccount(data);
  }

  @Post('create-extanal-account/:id')
  createExtanalAccount(@Param('id') id: string) {
    return this._stripeService.createExternalAccount({
      accountId: id,
    });
  }

  @Post('get-account/:id')
  getAccountId(@Param('id') id: string) {
    return this._stripeService.getAccount(id);
  }

  @Post('update-account/:id')
  updateAccount(@Param('id') id: string) {
    return this._stripeService.updateAccount(id);
  }

  @Post('create-account-link/:id')
  createAccountLink(@Param('id') id: string) {
    return this._stripeService.createAccountLink(id);
  }
}

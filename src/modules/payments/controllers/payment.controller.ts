import { Body, Controller, Post, UseGuards } from '@nestjs/common';

import { PaymentService } from '../services';
import { CreatePaymentDto } from '../dtos';
import { UserJwtAccessAuthGuard } from '@modules/auth/guards';
import { RequestUser } from '@common/decorators';
import { User } from '@modules/users/types';

@UseGuards(UserJwtAccessAuthGuard)
@Controller('payments')
export class PaymentController {
  constructor(private readonly _paymentService: PaymentService) {}

  @Post('create-payment-intent')
  createPaymentIntent(
    @Body() data: CreatePaymentDto,
    @RequestUser() user: User,
  ) {
    return this._paymentService.createPaymentIntent({
      ...data,
      userId: user.id,
      customerId: user.customerId,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
    });
  }
}

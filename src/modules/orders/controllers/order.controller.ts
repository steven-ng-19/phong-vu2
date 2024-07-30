import { Body, Controller, Post, UseGuards, UsePipes } from '@nestjs/common';

import { UserJwtAccessAuthGuard } from '@modules/auth/guards';
import { ZodValidationPipe } from '@anatine/zod-nestjs';
import { CreateOrderDto } from '../dtos';
import { RequestUser } from '@common/decorators';
import { User } from '@modules/users/types';
import { OrderService } from '../services';

@UseGuards(UserJwtAccessAuthGuard)
@Controller('orders')
export class OrderController {
  constructor(private readonly _orderService: OrderService) {}

  @Post()
  @UsePipes(new ZodValidationPipe())
  createOrder(@RequestUser() user: User, @Body() data: CreateOrderDto) {
    return this._orderService.create(user.id, data);
  }
}

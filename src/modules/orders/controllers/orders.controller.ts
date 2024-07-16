import { QueryParam } from '@common/decorators';
import { ZodValidationPipeCustom } from '@common/pipes';
import { OrderQueryParams } from '@common/types';
import { UserEntity } from '@modules/users/entities';
import { User } from '@modules/users/models';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';

import { JwtAuthGuard } from '../../auth/guards';
import {
  CheckoutOrderDto,
  CheckoutOrderSchema,
  CreateOrderDto,
  CreateOrderSchema,
} from '../dtos';
import { OrdersService } from '../services/orders.service';

@UseGuards(JwtAuthGuard)
@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Post()
  async createOrder(
    @Req() req: Request,
    @Body(new ZodValidationPipeCustom(CreateOrderSchema)) data: CreateOrderDto,
  ) {
    const { paymentMethodId, ...orderData } = data;
    const order = await this.ordersService.createOrder(
      orderData,
      req.user as User,
    );

    if (!paymentMethodId) return order;

    return this.ordersService.checkoutOrder(
      order._id.toString(),
      paymentMethodId,
      req.user as User,
    );
  }

  @Get()
  async getOrders(@Req() req: Request, @QueryParam() query: OrderQueryParams) {
    return this.ordersService.getOrders({
      ...query,
      where: { user: (req.user as User)._id },
    });
  }

  @Get(':orderId')
  async getOrder(@Param('orderId') orderId: string) {
    return this.ordersService.getOrder(orderId);
  }

  @Put(':orderId/checkout')
  async checkoutOrder(
    @Req() req: Request,
    @Param('orderId') orderId: string,
    @Body(new ZodValidationPipeCustom(CheckoutOrderSchema))
    data: CheckoutOrderDto,
  ) {
    const { paymentMethodId } = data;
    return this.ordersService.checkoutOrder(
      orderId,
      paymentMethodId,
      req.user as UserEntity,
    );
  }
}

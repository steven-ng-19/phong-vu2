import { QueryParam, Roles } from '@common/decorators';
import { UserRole } from '@common/enums';
import { OrderQueryParams, StatisticsQueryParams } from '@common/types';
import { Controller, Get, Param, UseGuards } from '@nestjs/common';

import { JwtAuthGuard, RolesGuard } from '../../auth/guards';
import { OrdersService } from '../services/orders.service';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
@Controller('admin/orders')
export class AdminOrderController {
  constructor(private ordersService: OrdersService) {}

  @Get()
  async getOrders(@QueryParam() query: OrderQueryParams) {
    return this.ordersService.getOrders(query, ['user']);
  }

  @Get('statistics')
  async getOrderStatistics(@QueryParam() query: StatisticsQueryParams) {
    return this.ordersService.getOrderStatistics(query);
  }

  @Get('statistics/revenue')
  async getRevenueStatistics(@QueryParam() query: StatisticsQueryParams) {
    return this.ordersService.getRevenueStatistics(query);
  }

  @Get(':orderId')
  async getOrder(@Param('orderId') orderId: string) {
    return this.ordersService.getOrder(orderId, ['user']);
  }
}

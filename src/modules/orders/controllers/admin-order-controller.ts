import { ZodValidationPipe } from '@anatine/zod-nestjs';
import { RequestUser } from '@common/decorators';
import { User } from '@modules/users/types';
import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { OrderService } from '../services';
import { ChangeStatusDto, CreateOrderDto, FindOrderByIdDto } from '../dtos';
import { DirectFilterPipe } from '@chax-at/prisma-filter';
import { Prisma } from '@prisma/client';
import { BaseQueryParams } from '@common/dtos';
import { DEFAULT_PAGE_SIZE } from '@common/constants';
import { ResponseService } from '@shared/response/response.service';
import { Request } from 'express';

@Controller('admin/orders')
export class AdminOrderController {
  constructor(private readonly _orderService: OrderService) {}

  @Patch(':id')
  @UsePipes(new ZodValidationPipe())
  changeStatus(
    @Body() data: ChangeStatusDto,
    @Param() params: FindOrderByIdDto,
  ) {
    return this._orderService.changeStatus(params, data);
  }

  @Get(':id')
  findOne(@Param() params: FindOrderByIdDto) {
    return this._orderService.findOne(params);
  }

  @Get()
  @UsePipes(new ValidationPipe({ transform: true }))
  async findAll(
    @Req() req: Request,
    @RequestUser() user: User,
    @Query(
      new DirectFilterPipe<any, Prisma.OrderWhereInput>(
        ['status', 'paymentMethod'],
        [],
        [{ createdAt: 'desc' }],
      ),
    )
    query: BaseQueryParams<Prisma.OrderWhereInput>,
  ) {
    const { findOptions, limit = DEFAULT_PAGE_SIZE, offset = 0 } = query;

    findOptions.where['userId'] = user.id;

    const { count, data } = await this._orderService.findMany({
      ...findOptions,
      skip: findOptions.skip ? Number(findOptions.skip) : undefined,
      take: findOptions.take ? Number(findOptions.take) : undefined,
    });

    return ResponseService.paginateResponse({
      count,
      data,
      query: {
        limit,
        offset,
      },
      req,
    });
  }
}

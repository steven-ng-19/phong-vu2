import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { ZodValidationPipe } from '@anatine/zod-nestjs';
import { CreatePromotionDto } from '../dtos/create-promotion.dto';
import { PromotionService } from '../services';
import { UpdatePromotionDto } from '../dtos';
import { FindPromotionByIdDto } from '../dtos/find-promotion.dto';
import { Request } from 'express';
import { DirectFilterPipe } from '@chax-at/prisma-filter';
import { Prisma } from '@prisma/client';
import { BaseQueryParams } from '@common/dtos';
import { DEFAULT_PAGE_SIZE } from '@common/constants';
import { ResponseService } from '@shared/response/response.service';

@Controller('admin/promotions')
export class AdminPromotionController {
  constructor(private readonly _promotionService: PromotionService) {}

  @Post()
  @UsePipes(new ZodValidationPipe())
  create(@Body() data: CreatePromotionDto) {
    return this._promotionService.create(data);
  }

  @Patch(':id')
  @UsePipes(new ZodValidationPipe())
  update(
    @Body() data: UpdatePromotionDto,
    @Param() params: FindPromotionByIdDto,
  ) {
    return this._promotionService.update(params.id, data);
  }

  @Get(':id')
  findOne(@Param() params: FindPromotionByIdDto) {
    return this._promotionService.findOne(params);
  }

  @Get()
  @UsePipes(new ValidationPipe({ transform: true }))
  async findAll(
    @Req() req: Request,
    @Query(
      new DirectFilterPipe<any, Prisma.PromotionWhereInput>(
        ['name', 'description', 'description'],
        ['benefit.id'],
        [{ createdAt: 'desc' }],
      ),
    )
    query: BaseQueryParams<Prisma.PromotionWhereInput>,
  ) {
    const { findOptions, limit = DEFAULT_PAGE_SIZE, offset = 0 } = query;

    const { count, data } = await this._promotionService.findMany({
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

  @Delete(':id')
  delete(@Param() params: FindPromotionByIdDto) {
    return this._promotionService.delete(params);
  }
}

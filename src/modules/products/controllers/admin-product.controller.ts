import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  Req,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { ZodValidationPipe } from '@anatine/zod-nestjs';
import {
  CreateProductDto,
  FindProductByIdDto,
  UpdateProductDto,
} from '../dtos';
import { ProductService } from '../services';
import { Request } from 'express';
import { DirectFilterPipe } from '@chax-at/prisma-filter';
import { Prisma } from '@prisma/client';
import { BaseQueryParams } from '@common/dtos';
import { ResponseService } from '@shared/response/response.service';
import { DEFAULT_PAGE_SIZE } from '@common/constants';

@Controller('admin/products')
export class AdminProductController {
  constructor(private readonly _productService: ProductService) {}

  @Post('')
  @UsePipes(new ZodValidationPipe())
  create(@Body() data: CreateProductDto) {
    return this._productService.create(data);
  }

  @Get('')
  @UsePipes(new ValidationPipe({ transform: true }))
  async findMany(
    @Req() req: Request,
    @Query(
      new DirectFilterPipe<any, Prisma.ProductWhereInput>(
        ['name', 'description', 'description'],
        [],
        [{ createdAt: 'desc' }],
      ),
    )
    query: BaseQueryParams<Prisma.ProductWhereInput>,
  ) {
    const { findOptions, limit = DEFAULT_PAGE_SIZE, offset = 0 } = query;

    const { count, data } = await this._productService.findMany({
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

  @Get(':id')
  findOne(@Param() params: FindProductByIdDto) {
    return this._productService.findOne(params.id);
  }

  @Patch(':id')
  @UsePipes(new ZodValidationPipe())
  update(
    @Param(new ParseUUIDPipe()) params: FindProductByIdDto,
    @Body() data: UpdateProductDto,
  ) {
    return this._productService.update(params.id, data);
  }

  @Delete(':id')
  delete(@Param(new ParseUUIDPipe()) params: FindProductByIdDto) {
    return this._productService.delete(params.id);
  }
}

import { DirectFilterPipe } from '@chax-at/prisma-filter';
import { CategoryService } from '../services';
import {
  Controller,
  Get,
  Param,
  Query,
  Req,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { BaseQueryParams } from '@common/dtos';
import { DEFAULT_PAGE_SIZE } from '@common/constants';
import { ResponseService } from '@shared/response/response.service';
import { Request } from 'express';
import { FindCategoryByIdDto } from '../dtos';

@Controller('categories')
export class CategoryController {
  constructor(private readonly _categoryService: CategoryService) {}

  @Get('')
  @UsePipes(new ValidationPipe({ transform: true }))
  async findMany(
    @Req() req: Request,
    @Query(
      new DirectFilterPipe<any, Prisma.CategoryWhereInput>(
        ['name', 'description', 'slug'],
        [],
        [{ createdAt: 'desc' }],
      ),
    )
    query: BaseQueryParams<Prisma.CategoryWhereInput>,
  ) {
    const { findOptions, limit = DEFAULT_PAGE_SIZE, offset = 0 } = query;

    const { count, data } = await this._categoryService.findMany({
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

  // TODO - Implement find one with products
  @Get(':id')
  async findOne(@Param() params: FindCategoryByIdDto) {
    return this._categoryService.findOne(params.id);
  }
}

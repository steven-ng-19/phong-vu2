import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { AdminJwtAccessAuthGuard } from '@modules/auth/guards';
import { ZodValidationPipe } from '@anatine/zod-nestjs';
import { CreateCategoryDto } from '../dtos';
import { CategoryService } from '../services';
import { DirectFilterPipe } from '@chax-at/prisma-filter';
import { Prisma } from '@prisma/client';
import { BaseQueryParams } from '@common/dtos';
import { ResponseService } from '@shared/response/response.service';
import { Request } from 'express';
import { DEFAULT_PAGE_SIZE } from '@common/constants';

// @UseGuards(AdminJwtAccessAuthGuard)
@Controller('admin/categories')
export class AdminCategoryController {
  constructor(private readonly _categoryService: CategoryService) {}

  @Post('')
  @UsePipes(ZodValidationPipe)
  create(@Body() data: CreateCategoryDto) {
    return this._categoryService.create(data);
  }

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
}

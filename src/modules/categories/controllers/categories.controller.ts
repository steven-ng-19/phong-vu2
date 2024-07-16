import { QueryParam } from '@common/decorators';
import { BaseQueryParams } from '@common/types';
import { Controller, Get, Param } from '@nestjs/common';

import { CategoriesService } from '../services/categories.service';

@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Get()
  async getCategories(@QueryParam() query: BaseQueryParams) {
    return this.categoriesService.getCategories(query);
  }

  @Get(':categoryId')
  async getCategory(@Param('categoryId') categoryId: string) {
    return this.categoriesService.getCategory(categoryId);
  }
}

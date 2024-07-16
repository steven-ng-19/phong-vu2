import { QueryParam, Roles } from '@common/decorators';
import { UserRole } from '@common/enums';
import { ZodValidationPipeCustom } from '@common/pipes';
import { BaseQueryParams } from '@common/types';
import { JwtAuthGuard, RolesGuard } from '@modules/auth/guards';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';

import {
  CreateCategoryDto,
  CreateCategorySchema,
  UpdateCategoryDto,
  UpdateCategorySchema,
} from '../dtos';
import { CategoriesService } from '../services/categories.service';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
@Controller('admin/categories')
export class AdminCategoryController {
  constructor(private categoriesService: CategoriesService) {}

  @Post()
  async createCategory(
    @Body(new ZodValidationPipeCustom(CreateCategorySchema))
    data: CreateCategoryDto,
  ) {
    return this.categoriesService.createCategory(data);
  }

  @Get()
  async getCategories(@QueryParam() query: BaseQueryParams) {
    return this.categoriesService.getCategories(query);
  }

  @Get(':categoryId')
  async getCategory(@Param('categoryId') categoryId: string) {
    return this.categoriesService.getCategory(categoryId);
  }

  @Put(':categoryId')
  async updateCategory(
    @Param('categoryId') categoryId: string,
    @Body(new ZodValidationPipeCustom(UpdateCategorySchema))
    data: UpdateCategoryDto,
  ) {
    return this.categoriesService.updateCategory(categoryId, data);
  }

  @Delete(':categoryId')
  async deleteCategory(@Param('categoryId') categoryId: string) {
    return this.categoriesService.deleteCategory(categoryId);
  }
}

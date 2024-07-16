import { QueryParam, Roles } from '@common/decorators';
import { UserRole } from '@common/enums';
import { ZodValidationPipeCustom } from '@common/pipes';
import { ProductQueryParams } from '@common/types';
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

import { JwtAuthGuard, RolesGuard } from '../../auth/guards';
import {
  CreateProductDto,
  CreateProductSchema,
  UpdateProductDto,
  UpdateProductSchema,
} from '../dtos';
import { ProductsService } from '../services/products.service';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
@Controller('admin/products')
export class AdminProductController {
  constructor(private productsService: ProductsService) {}

  @Post()
  async createProduct(
    @Body(new ZodValidationPipeCustom(CreateProductSchema))
    data: CreateProductDto,
  ) {
    return this.productsService.createProduct(data);
  }

  @Get()
  async getProducts(@QueryParam() query: ProductQueryParams) {
    return this.productsService.getProducts(query);
  }

  @Get(':productId')
  async getProduct(@Param('productId') productId: string) {
    return this.productsService.getProduct(productId);
  }

  @Put(':productId')
  async updateProduct(
    @Param('productId') productId: string,
    @Body(new ZodValidationPipeCustom(UpdateProductSchema))
    data: UpdateProductDto,
  ) {
    return this.productsService.updateProduct(productId, data);
  }

  @Delete(':productId')
  async deleteProduct(@Param('productId') productId: string) {
    return this.productsService.deleteProduct(productId);
  }
}

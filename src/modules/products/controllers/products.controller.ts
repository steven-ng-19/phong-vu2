import { QueryParam } from '@common/decorators';
import { ProductQueryParams } from '@common/types';
import { Controller, Get, Param } from '@nestjs/common';

import { ProductsService } from '../services/products.service';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  async getProducts(@QueryParam() query: ProductQueryParams) {
    return this.productsService.getProducts(query);
  }

  @Get(':productId')
  async getProduct(@Param('productId') productId: string) {
    return this.productsService.getProduct(productId);
  }
}

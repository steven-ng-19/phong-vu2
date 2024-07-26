import { AdminProductController, ProductController } from './controllers';

import { CategoryModule } from '@modules/categories/category.module';
import { Module } from '@nestjs/common';
import { ProductMapper } from './mappers';
import { ProductService } from './services';

@Module({
  imports: [CategoryModule],
  controllers: [ProductController, AdminProductController],
  providers: [ProductService, ProductMapper],
  exports: [],
})
export class ProductModule {}

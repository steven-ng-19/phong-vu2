import { AdminCategoryController, CategoryController } from './controllers';

import { CategoryMapper } from './mappers';
import { CategoryService } from './services';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [CategoryController, AdminCategoryController],
  providers: [CategoryService, CategoryMapper],
  exports: [CategoryService],
})
export class CategoryModule {}

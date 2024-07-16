import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AdminCategoryController, CategoriesController } from './controllers';
import { CATEGORY_MODEL, CategorySchema } from './models/category.schema';
import { CategoriesService } from './services/categories.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CATEGORY_MODEL, schema: CategorySchema },
    ]),
  ],
  controllers: [CategoriesController, AdminCategoryController],
  providers: [CategoriesService],
  exports: [CategoriesService],
})
export class CategoriesModule {}

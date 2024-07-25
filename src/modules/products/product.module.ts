import { Module } from '@nestjs/common';
import { ProductController } from './controllers';
import { ProductMapper } from './mappers';
import { ProductService } from './services';

@Module({
  imports: [],
  controllers: [ProductController],
  providers: [ProductService, ProductMapper],
  exports: [],
})
export class ProductModule {}

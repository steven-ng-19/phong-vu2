import { CartController } from './controllers';
import { CartMapper } from './mappers';
import { CartService } from './services';
import { Module } from '@nestjs/common';
import { ProductModule } from '@modules/products/product.module';

@Module({
  imports: [ProductModule],
  controllers: [CartController],
  providers: [CartService, CartMapper],
  exports: [],
})
export class CartModule {}

import { Module } from '@nestjs/common';
import { OrderController } from './controllers';
import { OrderMapper } from './mappers';
import { OrderService } from './services';
import { ProductModule } from '@modules/products/product.module';

@Module({
  imports: [ProductModule],
  controllers: [OrderController],
  providers: [OrderService, OrderMapper],
  exports: [],
})
export class OrderModule {}

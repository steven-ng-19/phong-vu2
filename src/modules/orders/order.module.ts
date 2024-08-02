import { AdminOrderController, OrderController } from './controllers';

import { AddressModule } from '@modules/addresses/address.module';
import { Module } from '@nestjs/common';
import { OrderMapper } from './mappers';
import { OrderService } from './services';
import { ProductModule } from '@modules/products/product.module';

@Module({
  imports: [ProductModule, AddressModule],
  controllers: [OrderController, AdminOrderController],
  providers: [OrderService, OrderMapper],
  exports: [OrderService],
})
export class OrderModule {}

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ProductsModule } from '../products/products.module';
import { AdminOrderController, OrdersController } from './controllers';
import {
  ORDER_ITEM_MODEL,
  ORDER_MODEL,
  OrderItemSchema,
  OrderSchema,
} from './models';
import { OrdersService } from './services/orders.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ORDER_MODEL, schema: OrderSchema },
      { name: ORDER_ITEM_MODEL, schema: OrderItemSchema },
    ]),
    ProductsModule,
  ],
  controllers: [OrdersController, AdminOrderController],
  providers: [OrdersService],
})
export class OrdersModule {}

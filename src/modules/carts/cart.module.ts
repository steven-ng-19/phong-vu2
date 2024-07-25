import { CartController } from './controllers';
import { CartMapper } from './mappers';
import { CartService } from './services';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [CartController],
  providers: [CartService, CartMapper],
  exports: [],
})
export class CartModule {}

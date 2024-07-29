import { AdminPromotionController, PromotionController } from './controllers';

import { Module } from '@nestjs/common';
import { ProductModule } from '@modules/products/product.module';
import { PromotionMapper } from './mappers';
import { PromotionService } from './services';

@Module({
  imports: [ProductModule],
  controllers: [PromotionController, AdminPromotionController],
  providers: [PromotionService, PromotionMapper],
  exports: [],
})
export class PromotionModule {}

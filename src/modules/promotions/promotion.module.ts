import { Module } from '@nestjs/common';
import { PromotionController } from './controllers';
import { PromotionMapper } from './mappers';
import { PromotionService } from './services';

@Module({
  imports: [],
  controllers: [PromotionController],
  providers: [PromotionService, PromotionMapper],
  exports: [],
})
export class PromotionModule {}

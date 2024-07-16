import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AdminPromotionController } from './controllers';
import { PromotionsController } from './controllers';
import { PROMOTION_MODEL, PromotionSchema } from './models';
import { PromotionsService } from './services';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PROMOTION_MODEL, schema: PromotionSchema },
    ]),
  ],
  controllers: [PromotionsController, AdminPromotionController],
  providers: [PromotionsService],
  exports: [PromotionsService],
})
export class PromotionsModule {}

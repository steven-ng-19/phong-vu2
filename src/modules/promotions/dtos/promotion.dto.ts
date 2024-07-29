import * as Zod from 'zod';

import {
  BenefitEntity,
  ConditionEntity,
  DiscountEntity,
  GiftEntity,
  PromotionEntity,
} from '../entities';

import { createZodDto } from '@anatine/zod-nestjs';

export const PromitionRequestValidator = PromotionEntity.extend({
  condition: ConditionEntity.pick({
    orderValueMax: true,
    orderValueMin: true,
    minQuantity: true,
  }).required(),
  benefit: BenefitEntity.extend({
    discount: DiscountEntity.pick({
      percent: true,
      maxAmount: true,
      flat: true,
      maxAmountPerOrder: true,
    }),
    gifts: Zod.array(
      GiftEntity.pick({
        sku: true,
        name: true,
        image: true,
        quantity: true,
        maxQuantityPerOrder: true,
      }),
    ),
  }).pick({
    discount: true,
    gifts: true,
  }),
});

export class PromotionDto extends createZodDto(PromitionRequestValidator) {}

import * as Zod from 'zod';

import {
  BenefitEntity,
  ConditionEntity,
  DiscountEntity,
  GiftEntity,
  PromotionEntity,
} from '../entities';

import { createZodDto } from '@anatine/zod-nestjs';

export const UpdatePromotionRequestValidator = PromotionEntity.extend({
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
    }).required(),
    gifts: Zod.array(
      GiftEntity.pick({
        sku: true,
        name: true,
        image: true,
        quantity: true,
        maxQuantityPerOrder: true,
      }),
    ).min(1),
  }).pick({
    discount: true,
    gifts: true,
  }),
}).pick({
  name: true,
  description: true,
  image: true,
  endDate: true,
  isDefault: true,
  condition: true,
  benefit: true,
  applyOn: true,
});

export class UpdatePromotionDto extends createZodDto(
  UpdatePromotionRequestValidator.partial(),
) {}

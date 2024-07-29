import { PromotionEntity } from '../entities';
import { createZodDto } from '@anatine/zod-nestjs';

export const FindPromotionByIdRequestValidator = PromotionEntity.pick({
  id: true,
});

export class FindPromotionByIdDto extends createZodDto(
  FindPromotionByIdRequestValidator,
) {}

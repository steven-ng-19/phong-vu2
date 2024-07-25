import { CardModel } from '../models';
import { createZodDto } from '@anatine/zod-nestjs';

export const CardShape = CardModel.shape;

export const CardKeys = CardModel.keyof().enum;

export const CardEntity = CardModel.extend({
  [CardKeys.id]: CardShape.id.trim().uuid(),
  [CardKeys.userId]: CardShape.userId.trim().uuid(),
  [CardKeys.pm]: CardShape.pm.trim(),
  [CardKeys.type]: CardShape.type.trim(),
  [CardKeys.isDefault]: CardShape.isDefault.optional().default(false),
  [CardKeys.createdAt]: CardShape.createdAt.optional(),
  [CardKeys.updatedAt]: CardShape.updatedAt.optional(),
});

export class CardDto extends createZodDto(CardEntity) {}

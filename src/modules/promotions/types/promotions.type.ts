import * as Zod from 'zod';

import {
  CREATE_PARAMS_WITHOUT_FIELDS,
  UPDATE_PARAMS_WITHOUT_FIELDS,
} from '@common/constants';
import { EntityNotInFilter, OptionalNullableFields } from '@common/types';

import { PromotionDto } from '../dtos';

export type Promotion = PromotionDto;

const PromotionUniqueKeyParams = Zod.object({
  id: Zod.string().uuid(),
});

export type PromotionFindByKeyParams = Zod.infer<
  typeof PromotionUniqueKeyParams
> & {
  excludes?: EntityNotInFilter<Promotion>;
};

export type PromotionCreateParams = OptionalNullableFields<
  Omit<Promotion, (typeof CREATE_PARAMS_WITHOUT_FIELDS)[number]>
>;

export type PromotionUpdateParams = Partial<
  Omit<Promotion, (typeof UPDATE_PARAMS_WITHOUT_FIELDS)[number]>
>;

export type PromotionPrimaryKey = Pick<Promotion, 'id'>;

export type PromotionFindByConditionsParams = Partial<
  Omit<Promotion, 'condition' | 'benefit'>
> & {
  excludes?: EntityNotInFilter<Promotion>;
};

export type PromotionFindManyByConditionsParams = Partial<Promotion> & {
  excludes?: EntityNotInFilter<Promotion>;
};

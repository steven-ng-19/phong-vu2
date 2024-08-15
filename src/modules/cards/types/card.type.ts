import * as Zod from 'zod';

import {
  CREATE_PARAMS_WITHOUT_FIELDS,
  UPDATE_PARAMS_WITHOUT_FIELDS,
} from '@common/constants';
import { EntityNotInFilter, OptionalNullableFields } from '@common/types';

import { CardDto } from '../entities';

export type Card = CardDto;

const CardUniqueKeyParams = Zod.union([
  Zod.object({
    id: Zod.string().trim().uuid(),
  }),
  Zod.object({
    userId: Zod.string().trim().uuid(),
  }),
]);

export type CardFindByKeyParams = Zod.infer<typeof CardUniqueKeyParams> & {
  excludes?: EntityNotInFilter<Card>;
};

export type CardFindByConditionsParams = Partial<Card> & {
  excludes?: EntityNotInFilter<Card>;
};

export type CardCreateParams = OptionalNullableFields<
  Omit<Card, (typeof CREATE_PARAMS_WITHOUT_FIELDS)[number]>
>;

export type CardUpdateParams = Partial<
  Omit<Card, (typeof UPDATE_PARAMS_WITHOUT_FIELDS)[number]>
>;

export type CardPrimaryKey = Pick<Card, 'id'>;

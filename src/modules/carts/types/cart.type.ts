import * as Zod from 'zod';

import {
  CREATE_PARAMS_WITHOUT_FIELDS,
  UPDATE_PARAMS_WITHOUT_FIELDS,
} from '@common/constants';
import { EntityNotInFilter, EntityWithoutFields } from '@common/types';

import { CartDto } from '../entities';

export type Cart = CartDto;

const CartUniqueKeyParams = Zod.union([
  Zod.object({
    id: Zod.string().trim().uuid(),
  }),
  Zod.object({
    userId: Zod.string().trim().uuid(),
    productId: Zod.string().trim().uuid(),
  }),
]);

export type CartFindByKeyParams = Zod.infer<typeof CartUniqueKeyParams> & {
  excludes?: EntityNotInFilter<Cart>;
};

export type CartFindByConditionParams = Partial<Cart> & {
  excludes?: EntityNotInFilter<Cart>;
};

export type CartCreateParams = EntityWithoutFields<
  Cart,
  (typeof CREATE_PARAMS_WITHOUT_FIELDS)[number]
>;

export type CartUpdateParams = Partial<
  EntityWithoutFields<Cart, (typeof UPDATE_PARAMS_WITHOUT_FIELDS)[number]>
>;

export type CartPrimaryKey = Pick<Cart, 'id'>;

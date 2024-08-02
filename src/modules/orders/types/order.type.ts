import * as Zod from 'zod';

import {
  CREATE_PARAMS_WITHOUT_FIELDS,
  UPDATE_PARAMS_WITHOUT_FIELDS,
} from '@common/constants';
import { EntityNotInFilter, EntityWithoutFields } from '@common/types';

import { OrderDto } from '../dtos';

export type Order = OrderDto;

const OrderUniqueKeyParams = Zod.union([
  Zod.object({
    id: Zod.string().trim().uuid(),
  }),
  Zod.object({
    userId: Zod.string().trim(),
  }),
]);

export type OrderFindByKeyParams = Zod.infer<typeof OrderUniqueKeyParams> & {
  excludes?: EntityNotInFilter<Order>;
};

export type OrderFindManyByKeyParams = Zod.infer<
  typeof OrderUniqueKeyParams
> & {
  excludes?: EntityNotInFilter<Order>;
};

export type OrderFindByConditionsParams = Partial<Order> & {
  excludes?: EntityNotInFilter<Order>;
};

export type OrderCreateParams = EntityWithoutFields<
  Order,
  (typeof CREATE_PARAMS_WITHOUT_FIELDS)[number]
>;

export type OrderUpdateParams = Pick<Order, 'status'>;

export type OrderPrimaryKey = Pick<Order, 'id'>;

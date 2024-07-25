import * as Zod from 'zod';

import {
  CREATE_PARAMS_WITHOUT_FIELDS,
  UPDATE_PARAMS_WITHOUT_FIELDS,
} from '@common/constants';
import { EntityNotInFilter, EntityWithoutFields } from '@common/types';

import { OrderDto } from '../entities';

export type Order = OrderDto;

const OrderUniqueKeyParams = Zod.object({
  id: Zod.string().trim().uuid(),
});

export type OrderFindByKeyParams = Zod.infer<typeof OrderUniqueKeyParams> & {
  excludes?: EntityNotInFilter<Order>;
};

export type OrderFindByConditionsParams = Partial<Order> & {
  excludes?: EntityNotInFilter<Order>;
};

export type OrderCreateParams = EntityWithoutFields<
  Order,
  (typeof CREATE_PARAMS_WITHOUT_FIELDS)[number]
>;

export type OrderUpdateParams = Partial<
  EntityWithoutFields<Order, (typeof UPDATE_PARAMS_WITHOUT_FIELDS)[number]>
>;

import * as Zod from 'zod';

import {
  CREATE_PARAMS_WITHOUT_FIELDS,
  UPDATE_PARAMS_WITHOUT_FIELDS,
} from '@common/constants';
import { EntityNotInFilter, EntityWithoutFields } from '@common/types';

import { AddressDto } from '../dtos';

export type Address = AddressDto;

const AddressUniqueKeyParams = Zod.union([
  Zod.object({
    id: Zod.string().trim().uuid(),
  }),
  Zod.object({
    userId: Zod.string().trim().uuid(),
  }),
]);

export type AddressFindByKeyParams = Zod.infer<
  typeof AddressUniqueKeyParams
> & {
  excludes?: EntityNotInFilter<Address>;
};

export type AddressCreateParams = EntityWithoutFields<
  Address,
  (typeof CREATE_PARAMS_WITHOUT_FIELDS)[number]
>;

export type AddressUpdateParams = Partial<
  EntityWithoutFields<Address, (typeof UPDATE_PARAMS_WITHOUT_FIELDS)[number]>
>;

export type AddressPrimaryKey = Pick<Address, 'id'>;

export type AddressFindByCondition = Partial<Address> & {
  excludes?: EntityNotInFilter<Address>;
};

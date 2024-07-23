import * as Zod from 'zod';

import {
  CREATE_PARAMS_WITHOUT_FIELDS,
  UPDATE_PARAMS_WITHOUT_FIELDS,
} from '@common/constants';
import {
  EntityNotInFilter,
  EntityWithoutFields,
  OptionalNullAbleFields,
} from '@common/types';

import { UserDto } from '../entities';

// export const UserParamsSchema = UserEntity;

const UserUniqueKeyParams = Zod.union([
  Zod.object({
    id: Zod.string(),
  }),
  Zod.object({
    email: Zod.string(),
  }),
  Zod.object({
    customerId: Zod.string(),
  }),
]);

export type User = UserDto;

export type UserFindByKeyParams = Zod.infer<typeof UserUniqueKeyParams> & {
  excludes?: EntityNotInFilter<User>;
};

export type UserCreateParams = EntityWithoutFields<
  User,
  (typeof CREATE_PARAMS_WITHOUT_FIELDS)[number]
>;

export type UserUpdateParams = Partial<
  EntityWithoutFields<User, (typeof UPDATE_PARAMS_WITHOUT_FIELDS)[number]>
>;

export type UserPrimaryKey = Pick<User, 'id'>;

export type UserFindByConditionsParams = Partial<User> & {
  excludes?: EntityNotInFilter<User>;
};

import * as Zod from 'zod';

import {
  EntityNotInFilter,
  EntityWithoutFields,
  OptionalNullAbleFields,
} from '@common/types';
import { UserDto, UserEntity } from '../entities';

import { CREATE_PARAMS_WITHOUT_FIELDS } from '@common/constants';

export const UserParamsSchema = UserEntity;

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

export type UserCreateParams = OptionalNullAbleFields<
  EntityWithoutFields<User, (typeof CREATE_PARAMS_WITHOUT_FIELDS)[number]>
>;

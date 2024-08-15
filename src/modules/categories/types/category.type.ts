import * as Zod from 'zod';

import {
  CREATE_PARAMS_WITHOUT_FIELDS,
  UPDATE_PARAMS_WITHOUT_FIELDS,
} from '@common/constants';
import { EntityNotInFilter, OptionalNullableFields } from '@common/types';

import { CategoryDto } from '../entities';

const CategoryUniqueKeyParams = Zod.union([
  Zod.object({
    id: Zod.string(),
  }),
  Zod.object({
    slug: Zod.string(),
  }),
  Zod.object({
    name: Zod.string(),
  }),
]);

const CategoryManyUniqueKeyParams = Zod.object({
  id: Zod.array(Zod.string()),
});

export type Category = CategoryDto;

export type CategoryFindByKeyParams = Zod.infer<
  typeof CategoryUniqueKeyParams
> & {
  excludes?: EntityNotInFilter<Category>;
};

export type CategoryFindManyKeyParams = Zod.infer<
  typeof CategoryManyUniqueKeyParams
> & {
  excludes?: EntityNotInFilter<Category>;
};

export type CategoryCreateParams = OptionalNullableFields<
  Omit<Category, (typeof CREATE_PARAMS_WITHOUT_FIELDS)[number]>
>;

export type CategoryUpdateParams = Partial<
  Omit<Category, (typeof UPDATE_PARAMS_WITHOUT_FIELDS)[number]>
>;

export type CategoryPrimaryKey = Pick<Category, 'id'>;

export type CategoryFindByConditionsParams = Partial<Category> & {
  excludes?: EntityNotInFilter<Category>;
};

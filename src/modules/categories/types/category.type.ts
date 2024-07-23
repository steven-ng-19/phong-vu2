import * as Zod from 'zod';

import {
  EntityNotInFilter,
  EntityWithoutFields,
  OptionalNullAbleFields,
} from '@common/types';

import { CREATE_PARAMS_WITHOUT_FIELDS } from '@common/constants';
import { CategoryDto } from '../entities';

const CategoryUniqueKeyParams = Zod.union([
  Zod.object({
    id: Zod.string(),
  }),
  Zod.object({
    slug: Zod.string(),
  }),
]);

export type Category = CategoryDto;

export type CategoryFindByKeyParams = Zod.infer<
  typeof CategoryUniqueKeyParams
> & {
  excludes?: EntityNotInFilter<Category>;
};

export type CategoryCreateParams = OptionalNullAbleFields<
  EntityWithoutFields<Category, (typeof CREATE_PARAMS_WITHOUT_FIELDS)[number]>
>;

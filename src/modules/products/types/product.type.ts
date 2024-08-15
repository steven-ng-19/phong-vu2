import * as Zod from 'zod';

import {
  CREATE_PARAMS_WITHOUT_FIELDS,
  UPDATE_PARAMS_WITHOUT_FIELDS,
} from '@common/constants';
import { EntityNotInFilter, OptionalNullableFields } from '@common/types';

import { ProductDto } from '../dtos';

const ProductUniqueKeyParams = Zod.object({
  id: Zod.string().uuid().trim(),
});

export type Product = ProductDto;

export type ProductFindByKeyParams = Zod.infer<
  typeof ProductUniqueKeyParams
> & {
  excludes?: EntityNotInFilter<Product>;
};

export type ProductFindByConditionsParams = Partial<
  Omit<Product, 'galleries'>
> & {
  excludes?: EntityNotInFilter<Product>;
};

export type ProductCreateParams = OptionalNullableFields<
  Omit<Product, (typeof CREATE_PARAMS_WITHOUT_FIELDS)[number]>
>;

export type ProductUpdateParams = Partial<
  Omit<Product, (typeof UPDATE_PARAMS_WITHOUT_FIELDS)[number]>
>;

export type ProductPrimaryKey = Pick<Product, 'id'>;

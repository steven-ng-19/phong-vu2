import * as Zod from 'zod';

import {
  CREATE_PARAMS_WITHOUT_FIELDS,
  UPDATE_PARAMS_WITHOUT_FIELDS,
} from '@common/constants';
import { EntityNotInFilter, EntityWithoutFields } from '@common/types';

import { ProductDto } from '../entities';

const ProductUniqueKeyParams = Zod.object({
  id: Zod.string().uuid().trim(),
});

export type Product = ProductDto;

export type ProductFindByKeyParams = Zod.infer<
  typeof ProductUniqueKeyParams
> & {
  excludes?: EntityNotInFilter<Product>;
};

export type ProductFindByConditionsParams = Partial<Product> & {
  excludes?: EntityNotInFilter<Product>;
};

export type ProductCreateParams = EntityWithoutFields<
  Product,
  (typeof CREATE_PARAMS_WITHOUT_FIELDS)[number]
>;

export type ProductUpdateParams = Partial<
  EntityWithoutFields<Product, (typeof UPDATE_PARAMS_WITHOUT_FIELDS)[number]>
>;

export type ProductPrimaryKey = Pick<Product, 'id'>;

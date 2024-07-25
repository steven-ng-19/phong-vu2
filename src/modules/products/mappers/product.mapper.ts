import {
  ProductCreateParams,
  ProductFindByConditionsParams,
  ProductFindByKeyParams,
  ProductPrimaryKey,
  ProductUpdateParams,
} from '../types';

import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class ProductMapper {
  constructor() {}

  findOneByKey(params: ProductFindByKeyParams): Prisma.ProductFindFirstArgs {
    const { excludes = {}, ...rest } = params;

    return {
      where: {
        ...rest,
        ...Object.fromEntries(
          Object.entries(excludes).map(([key, value]) => [
            key,
            {
              notIn: value,
            },
          ]),
        ),
      },
    };
  }

  findOne(params: ProductFindByConditionsParams): Prisma.ProductFindFirstArgs {
    const { excludes = {}, ...rest } = params;

    return {
      where: {
        ...rest,
        ...Object.fromEntries(
          Object.entries(excludes).map(([key, value]) => [
            key,
            {
              notIn: value,
            },
          ]),
        ),
      },
    };
  }

  create(data: ProductCreateParams): Prisma.ProductCreateArgs {
    return {
      data,
    };
  }

  update(
    { id }: ProductPrimaryKey,
    data: ProductUpdateParams,
  ): Prisma.ProductUpdateArgs {
    return {
      where: {
        id,
      },
      data,
    };
  }
}

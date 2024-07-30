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
        deletedAt: null,
      },
      select: {
        id: true,
        image: true,
        description: true,
        category: true,
        name: true,
        sku: true,
        price: true,
        slug: true,
        createdAt: true,
        updatedAt: true,
        galleries: true,
        discount: true,
        quantity: true,
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
        deletedAt: null,
      },
    };
  }

  create(data: ProductCreateParams): Prisma.ProductCreateArgs {
    const { galleries, ...rest } = data;
    return {
      data: {
        ...rest,
        galleries: {
          createMany: {
            data: data.galleries,
          },
        },
      },
    };
  }

  update(
    { id }: ProductPrimaryKey,
    data: ProductUpdateParams,
  ): Prisma.ProductUpdateArgs {
    const { galleries: gallerieDelete, ...rest } = data;

    return {
      where: {
        id,
      },
      data: {
        ...rest,
        galleries: gallerieDelete && {
          deleteMany: {},
          createMany: {
            data: gallerieDelete,
          },
        },
      },
    };
  }

  delete({ id }: ProductPrimaryKey): Prisma.ProductUpdateArgs {
    return {
      where: {
        id,
      },
      data: {
        deletedAt: new Date(),
      },
    };
  }
}

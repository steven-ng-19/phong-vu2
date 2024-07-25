import {
  CartCreateParams,
  CartFindByConditionParams,
  CartFindByKeyParams,
  CartPrimaryKey,
  CartUpdateParams,
} from '../types';

import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class CartMapper {
  constructor() {}

  findOneByKey(params: CartFindByKeyParams): Prisma.CartItemFindFirstArgs {
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

  findOne(params: CartFindByConditionParams): Prisma.CartItemFindFirstArgs {
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

  create(data: CartCreateParams): Prisma.CartItemCreateArgs {
    return {
      data: {
        ...data,
      },
    };
  }

  update(
    { id }: CartPrimaryKey,
    data: CartUpdateParams,
  ): Prisma.CartItemUpdateArgs {
    return {
      where: {
        id,
      },
      data: {
        ...data,
      },
    };
  }
}

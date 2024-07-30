import {
  CartCreateParams,
  CartDeleteByKeyParams,
  CartDeleteManyByKeyParams,
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
      include: {
        product: true,
        user: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
            gender: true,
          },
        },
      },
    };
  }

  findManyByKey(params: CartFindByKeyParams): Prisma.CartItemFindManyArgs {
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
      select: {
        id: true,
        quantity: true,
        product: {
          select: {
            name: true,
            price: true,
          },
        },
        user: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
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

  deleteByKey(params: CartPrimaryKey): Prisma.CartItemDeleteArgs {
    return {
      where: {
        ...params,
      },
    };
  }

  deleteManyByKey(
    params: CartDeleteManyByKeyParams,
  ): Prisma.CartItemDeleteManyArgs {
    return {
      where: {
        ...params,
      },
    };
  }
}

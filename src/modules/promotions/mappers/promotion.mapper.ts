import {
  PromotionCreateParams,
  PromotionFindByConditionsParams,
  PromotionFindByKeyParams,
  PromotionPrimaryKey,
  PromotionUpdateParams,
} from '../types';

import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class PromotionMapper {
  constructor() {}

  findOneByKey(
    params: PromotionFindByKeyParams,
  ): Prisma.PromotionFindFirstArgs {
    const { excludes = {}, ...rest } = params;

    return {
      where: {
        ...rest,
        ...Object.fromEntries(
          Object.entries(excludes).map(([key, value]) => [
            key,
            { notIn: value },
          ]),
        ),
        deletedAt: null,
      },
      include: {
        benefit: { include: { discount: true, gifts: true } },
        condition: true,
      },
    };
  }

  findOne(
    params: PromotionFindByConditionsParams,
  ): Prisma.PromotionFindFirstArgs {
    const { excludes = {}, ...rest } = params;

    return {
      where: {
        ...rest,
        ...Object.fromEntries(
          Object.entries(excludes).map(([key, value]) => [
            key,
            { notIn: value },
          ]),
        ),
        deletedAt: null,
      },
      include: {
        benefit: { include: { discount: true, gifts: true } },
        condition: true,
      },
    };
  }

  create(params: PromotionCreateParams): Prisma.PromotionCreateArgs {
    const { condition, benefit, ...rest } = params;
    return {
      data: {
        ...rest,
        condition: condition
          ? {
              create: {
                ...condition,
              },
            }
          : undefined,
        benefit: benefit
          ? {
              create: {
                discount: benefit.discount && {
                  create: {
                    ...benefit.discount,
                  },
                },
                gifts: benefit.gifts && {
                  create: benefit.gifts.map((gift) => ({
                    ...gift,
                  })),
                },
              },
            }
          : undefined,
      },
    };
  }

  update(
    { id }: PromotionPrimaryKey,
    params: PromotionUpdateParams,
  ): Prisma.PromotionUpdateArgs {
    const { benefit, condition, ...rest } = params;

    return {
      where: {
        id,
      },
      data: {
        ...rest,
        condition: condition
          ? {
              update: {
                ...condition,
              },
            }
          : undefined,
        benefit: benefit
          ? {
              update: {
                discount: benefit.discount && {
                  create: {
                    ...benefit.discount,
                  },
                },
                gifts: benefit.gifts && {
                  deleteMany: {},
                  create: benefit.gifts.map((gift) => ({
                    ...gift,
                  })),
                },
              },
            }
          : undefined,
      },
    };
  }

  delete({ id }: PromotionPrimaryKey): Prisma.PromotionUpdateArgs {
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

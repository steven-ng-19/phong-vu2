import {
  CategoryCreateParams,
  CategoryFindByConditionsParams,
  CategoryFindByKeyParams,
  CategoryFindManyKeyParams,
  CategoryPrimaryKey,
  CategoryUpdateParams,
} from '../types/category.type';

import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { isArray } from '@common/utils';

@Injectable()
export class CategoryMapper {
  constructor() {}

  findOneByKey(params: CategoryFindByKeyParams): Prisma.CategoryFindFirstArgs {
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
        isDeprecated: false,
      },
    };
  }

  findOne(params: CategoryFindByKeyParams): Prisma.CategoryFindFirstArgs {
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

  create(data: CategoryCreateParams): Prisma.CategoryCreateArgs {
    return {
      data,
    };
  }

  update(
    { id }: CategoryPrimaryKey,
    data: CategoryUpdateParams,
  ): Prisma.CategoryUpdateArgs {
    return {
      where: {
        id,
      },
      data,
    };
  }

  count(params: CategoryFindByConditionsParams): Prisma.CategoryCountArgs {
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
        isDeprecated: false,
      },
    };
  }

  findManyByKey(
    params: CategoryFindManyKeyParams,
  ): Prisma.CategoryFindManyArgs {
    const { excludes = {}, ...rest } = params;

    return {
      where: {
        ...Object.fromEntries(
          Object.entries(rest).map(([key, value]) =>
            isArray(value) ? [key, { in: value }] : [key, value],
          ),
        ),
        ...Object.fromEntries(
          Object.entries(excludes).map(([key, value]) => [
            key,
            {
              notIn: value,
            },
          ]),
        ),
        isDeprecated: false,
      },
    };
  }

  delete({ id }: CategoryPrimaryKey): Prisma.CategoryUpdateArgs {
    return {
      where: {
        id,
      },
      data: {
        isDeprecated: true,
      },
    };
  }
}

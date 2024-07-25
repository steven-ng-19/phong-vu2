import {
  CardCreateParams,
  CardFindByConditionsParams,
  CardFindByKeyParams,
  CardPrimaryKey,
  CardUpdateParams,
} from '../types';

import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class CardMapper {
  constructor() {}

  findOneByKey(params: CardFindByKeyParams): Prisma.CardFindFirstArgs {
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

  findOne(params: CardFindByConditionsParams): Prisma.CardFindFirstArgs {
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
      },
    };
  }

  create(data: CardCreateParams): Prisma.CardCreateArgs {
    return {
      data,
    };
  }

  update(
    { id }: CardPrimaryKey,
    data: CardUpdateParams,
  ): Prisma.CardUpdateArgs {
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

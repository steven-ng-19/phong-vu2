import {
  AddressCreateParams,
  AddressFindByCondition,
  AddressFindByKeyParams,
  AddressPrimaryKey,
  AddressUpdateParams,
} from '../types/address.type';

import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class AddressMapper {
  constructor() {}

  create(data: AddressCreateParams): Prisma.AddressCreateArgs {
    return {
      data: {
        ...data,
        userId: data.userId,
      },
    };
  }

  findOneByKey(params: AddressFindByKeyParams): Prisma.AddressFindFirstArgs {
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
        user: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
            dob: true,
          },
        },
      },
    };
  }

  findOne(params: AddressFindByCondition): Prisma.AddressFindFirstArgs {
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

  update(
    { id }: AddressPrimaryKey,
    data: AddressUpdateParams,
  ): Prisma.AddressUpdateArgs {
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

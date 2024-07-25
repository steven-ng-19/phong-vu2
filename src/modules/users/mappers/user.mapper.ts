import {
  UserCreateParams,
  UserFindByConditionsParams,
  UserFindByKeyParams,
  UserPrimaryKey,
  UserUniqueKey,
  UserUpdateParams,
} from '../types/user.type';

import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { UserKeys } from '../entities';

@Injectable()
export class UserMapper {
  constructor() {}

  findOneByKey(params: UserFindByKeyParams): Prisma.UserFindFirstArgs {
    const { excludes = {}, ...restParams } = params;
    return {
      where: {
        ...restParams,
        ...Object.fromEntries(
          Object.entries(excludes).map(([key, value]) => [
            key,
            { notIn: value },
          ]),
        ),
      },
      select: {
        id: true,
        email: true,
        avatar: true,
        cover: true,
        gender: true,
      },
    };
  }

  findOne(params: UserFindByConditionsParams): Prisma.UserFindFirstArgs {
    const { excludes = {}, ...restData } = params;

    return {
      where: {
        ...restData,
        ...Object.fromEntries(
          Object.entries(excludes).map(([key, value]) => [
            key,
            { notIn: value },
          ]),
        ),
      },
    };
  }

  create(data: UserCreateParams): Prisma.UserCreateArgs {
    return {
      data: {
        ...data,
        role: data.role as string,
        gender: data.gender as string,
      },
    };
  }

  update(
    { id }: UserPrimaryKey,
    data: UserUpdateParams,
  ): Prisma.UserUpdateArgs {
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

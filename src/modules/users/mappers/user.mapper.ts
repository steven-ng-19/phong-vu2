import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { UserFindByKeyParams } from '../types/user.type';

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
        password: true,
        avatar: true,
        cover: true,
        gender: true,
      },
    };
  }
}

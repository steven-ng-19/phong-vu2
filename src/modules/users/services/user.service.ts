import {
  FindUserByClerkIdDto,
  FindUserByEmailDto,
  FindUserByIdDto,
} from '../dtos';
import {
  User,
  UserCreateParams,
  UserPrimaryKey,
  UserUpdateParams,
} from '../types/user.type';

import { Injectable } from '@nestjs/common';
import { PrismaService } from '@shared/prisma/prisma.service';
import { UserFindByConditionsParams } from './../types/user.type';
import { UserMapper } from '../mappers';

@Injectable()
export class UserService {
  constructor(
    private readonly _userMapper: UserMapper,
    private readonly _prismaService: PrismaService,
  ) {}
  async findOneByEmail(query: FindUserByEmailDto): Promise<User | null> {
    const mappedData = this._userMapper.findOneByKey(query);

    const user = await this._prismaService.user.findFirst(mappedData);

    return user;
  }

  async findOneById(query: FindUserByIdDto): Promise<User | null> {
    const mappedData = this._userMapper.findOneByKey(query);

    const user = await this._prismaService.user.findFirst(mappedData);

    return user;
  }

  async findOneByClerkId(query: FindUserByClerkIdDto): Promise<User | null> {
    const mappedData = this._userMapper.findOneByKey(query);

    const user = await this._prismaService.user.findFirst(mappedData);

    return user;
  }

  async findOne(params: UserFindByConditionsParams): Promise<User | null> {
    const mappedData = this._userMapper.findOne(params);

    const user = await this._prismaService.user.findFirst(mappedData);

    return user;
  }

  // async findOne(query: Find)

  async create(data: UserCreateParams): Promise<User> {
    const mappedData = this._userMapper.create(data);

    const user = await this._prismaService.user.create(mappedData);

    return user;
  }

  async update(key: UserPrimaryKey, data: UserUpdateParams): Promise<User> {
    const mappedData = this._userMapper.update(key, data);

    const user = await this._prismaService.user.update(mappedData);

    return user;
  }
}

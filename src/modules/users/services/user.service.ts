import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  FindUserByClerkIdDto,
  FindUserByEmailDto,
  FindUserByIdDto,
  UpdateOwnProfileDto,
} from '../dtos';
import {
  User,
  UserCreateParams,
  UserPrimaryKey,
  UserUpdateParams,
} from '../types/user.type';

import { CONFIG_VAR } from '@config/config.constant';
import { ConfigService } from '@nestjs/config';
import { JwtClerkPayload } from '@modules/auth/types';
import { PrismaService } from '@shared/prisma/prisma.service';
import { USER_ERRORS } from 'src/content/errors';
import { UserFindByConditionsParams } from './../types/user.type';
import { UserMapper } from '../mappers';
import { UserQueueService } from './user-queue.service';
import { verify } from 'jsonwebtoken';

@Injectable()
export class UserService {
  constructor(
    private readonly _userMapper: UserMapper,
    private readonly _prismaService: PrismaService,
    private readonly _configService: ConfigService,
    private readonly _userQueueService: UserQueueService,
  ) {}
  async findOneByEmail(query: FindUserByEmailDto): Promise<User | null> {
    const mappedData = this._userMapper.findOneByKey(query);

    const user = await this._prismaService.user.findFirst(mappedData);

    if (!user) {
      throw new NotFoundException(USER_ERRORS.NOT_FOUND);
    }

    return user;
  }

  async findOneById(query: FindUserByIdDto): Promise<User | null> {
    const mappedData = this._userMapper.findOneByKey(query);

    const user = await this._prismaService.user.findFirst(mappedData);

    if (!user) {
      throw new NotFoundException(USER_ERRORS.NOT_FOUND);
    }

    return user;
  }

  async findOneByClerkId(query: FindUserByClerkIdDto): Promise<User | null> {
    const mappedData = this._userMapper.findOneByKey(query);

    const user = await this._prismaService.user.findFirst(mappedData);

    if (!user) {
      throw new NotFoundException(USER_ERRORS.NOT_FOUND);
    }

    return user;
  }

  async findOne(params: UserFindByConditionsParams): Promise<User | null> {
    const mappedData = this._userMapper.findOne(params);

    const user = await this._prismaService.user.findFirst(mappedData);

    if (!user) {
      throw new NotFoundException(USER_ERRORS.NOT_FOUND);
    }

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

  async updateOwnProfile(id: string, data: UpdateOwnProfileDto) {
    try {
      const {
        firstName,
        lastName,
        userId: clerkId,
      } = verify(
        data.token,
        this._configService.getOrThrow(CONFIG_VAR.CLERK_JWT_KEY),
      ) as JwtClerkPayload;

      const user = await this.findOne({
        clerkId,
        id,
      });

      if (!user) {
        throw new NotFoundException(USER_ERRORS.NOT_FOUND);
      }

      Promise.all([
        this.update(
          { id },
          {
            firstName,
            lastName,
          },
        ),
        this._userQueueService.addUpdateOwnProfile(
          firstName,
          lastName,
          clerkId,
        ),
      ]);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}

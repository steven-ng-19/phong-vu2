import { FindUserByEmailDto } from '../dtos';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '@shared/prisma/prisma.service';
import { RegisterRequestDto } from '@modules/auth/dtos';
import { User } from '../types/user.type';
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

  async create(data: RegisterRequestDto): Promise<any> {}
}

import { Address, Prisma } from '@prisma/client';
import {
  AddressCreateParams,
  AddressUpdateParams,
} from '../types/address.type';
import { CreateAddressDto, FindAddressByIdDto, SetDefaultDto } from '../dtos';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PaginateResponse, SuccessResponse } from '@common/types';

import { ADDRESS_ERRORS } from 'src/content/errors';
import { AddressMapper } from '../mappers';
import { PrismaService } from '@shared/prisma/prisma.service';
import { UpdateAddressDto } from '../dtos/update-address.dto';

@Injectable()
export class AddressService {
  constructor(
    private readonly _addressMapper: AddressMapper,
    private readonly _prismaService: PrismaService,
  ) {}

  /** ====================== Service of controller ====================== */

  async create(
    data: CreateAddressDto,
    userId: string,
  ): Promise<SuccessResponse<undefined>> {
    const params: AddressCreateParams = {
      ...data,
      isDefault: false,
      userId,
    };

    const mappedData = this._addressMapper.create(params);

    await this._prismaService.address.create(mappedData);

    return {
      success: true,
    };
  }

  async findMany(
    query: Prisma.AddressFindManyArgs,
    userId: string,
  ): Promise<PaginateResponse<Address>> {
    const [count, address] = await Promise.all([
      this._prismaService.address.count({
        where: { ...query.where, userId },
      }),
      this._prismaService.address.findMany({
        ...query,
        where: { ...query.where, userId },
      }),
    ]);

    return { count, data: address };
  }

  async findOne(params: FindAddressByIdDto): Promise<Address> {
    const address = await this.findOneById(params.id);

    if (!address) throw new NotFoundException(ADDRESS_ERRORS.NOT_FOUND);

    return address;
  }

  async changeStatus(
    id: string,
    data: SetDefaultDto,
  ): Promise<SuccessResponse<undefined>> {
    const address = await this.findOneById(id);
    if (!address) throw new NotFoundException(ADDRESS_ERRORS.NOT_FOUND);

    const params: AddressUpdateParams = {
      isDefault: data.status,
    };
    const mapped = this._addressMapper.update({ id }, params);

    await this._prismaService.address.update(mapped);

    return {
      success: true,
    };
  }

  async update(
    id: string,
    data: UpdateAddressDto,
  ): Promise<SuccessResponse<undefined>> {
    const address = await this.findOneById(id);
    if (!address) throw new NotFoundException(ADDRESS_ERRORS.NOT_FOUND);

    const params: AddressUpdateParams = {
      ...data,
    };
    const mapped = this._addressMapper.update({ id }, params);

    await this._prismaService.address.update(mapped);
    return {
      success: true,
    };
  }

  /** ====================== Func general ====================== */

  async findOneById(id: string): Promise<Address | null> {
    const mapped = this._addressMapper.findOneByKey({ id });

    const result = await this._prismaService.address.findFirst(mapped);

    return result;
  }
}

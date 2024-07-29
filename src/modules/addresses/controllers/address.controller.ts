import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { UserJwtAccessAuthGuard } from '@modules/auth/guards';
import { CreateAddressDto, FindAddressByIdDto, SetDefaultDto } from '../dtos';
import { ZodValidationPipe } from '@anatine/zod-nestjs';
import { AddressService } from '../services';
import { RequestUser } from '@common/decorators';
import { User } from '@modules/users/types';
import { Request } from 'express';
import { DirectFilterPipe } from '@chax-at/prisma-filter';
import { BaseQueryParams } from '@common/dtos';
import { Address, Prisma } from '@prisma/client';
import { DEFAULT_PAGE_SIZE } from '@common/constants';
import { ResponseService } from '@shared/response/response.service';
import { UpdateAddressDto } from '../dtos/update-address.dto';
import { SuccessResponse } from '@common/types';
import { ApiPaginateResponseOutputDto } from '@shared/response/dtos';
import { AddressCreateParams } from '../types/address.type';

@UseGuards(UserJwtAccessAuthGuard)
@Controller('addresses')
export class AddressController {
  constructor(private readonly _addressService: AddressService) {}

  @Post('')
  @UsePipes(ZodValidationPipe)
  create(
    @Body() data: CreateAddressDto,
    @RequestUser() user: User,
  ): Promise<SuccessResponse<undefined>> {
    return this._addressService.create(data, user.id);
  }

  @Patch('change-status/:id')
  @UsePipes(ZodValidationPipe)
  changeStatus(
    @Body() data: SetDefaultDto,
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<SuccessResponse<undefined>> {
    return this._addressService.changeStatus(id, data);
  }

  @Patch(':id')
  @UsePipes(ZodValidationPipe)
  update(
    @Body() data: UpdateAddressDto,
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<SuccessResponse<undefined>> {
    return this._addressService.update(id, data);
  }

  @Get('')
  @UsePipes(new ValidationPipe({ transform: true }))
  async findMany(
    @Req() req: Request,
    @Query(
      new DirectFilterPipe<any, Prisma.AddressWhereInput>(
        ['address', 'city', 'country', 'district', 'fullName', 'phone', 'ward'],
        [],
        [{ createdAt: 'desc' }],
      ),
    )
    query: BaseQueryParams<Prisma.AddressWhereInput>,
    @RequestUser() user: User,
  ) {
    const { findOptions, limit = DEFAULT_PAGE_SIZE, offset = 0 } = query;

    const { count, data } = await this._addressService.findMany(
      {
        ...findOptions,
        skip: findOptions.skip ? Number(findOptions.skip) : undefined,
        take: findOptions.take ? Number(findOptions.take) : undefined,
      },
      user.id,
    );

    return ResponseService.paginateResponse({
      count,
      data,
      query: {
        limit,
        offset,
      },
      req,
    });
  }

  @Get(':id')
  async findOne(@Param() params: FindAddressByIdDto): Promise<Address> {
    const result = await this._addressService.findOne(params);
    return result;
  }
}

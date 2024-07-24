import { Body, Controller, Post, UseGuards, UsePipes } from '@nestjs/common';

import { UserJwtAccessAuthGuard } from '@modules/auth/guards';
import { CreateAddressDto } from '../dtos';
import { ZodValidationPipe } from '@anatine/zod-nestjs';
import { AddressService } from '../services';
import { RequestUser } from '@common/decorators';
import { JwtClerkPayload } from '@modules/auth/types';

@UseGuards(UserJwtAccessAuthGuard)
@Controller('addresses')
export class AddressController {
  constructor(private readonly _addressService: AddressService) {}

  @Post('')
  @UsePipes(ZodValidationPipe)
  create(@Body() data: CreateAddressDto, @RequestUser() user: JwtClerkPayload) {
    return this._addressService.create({ ...data, userId: user.id });
  }
}

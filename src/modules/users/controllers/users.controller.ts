import { ZodValidationPipeCustom } from '@common/pipes';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { StripeService } from '@shared/stripe/services';
import { Request } from 'express';

import { JwtAuthGuard } from '../../auth/guards';
import {
  CreateAddressDto,
  CreateAddressSchema,
  UpdateAddressDto,
  UpdateAddressSchema,
  UpdateProfileDto,
  UpdateProfileSchema,
} from '../dtos';
import { UserEntity } from '../entities';
import { AddressService } from '../services/address.service';
import { UsersService } from '../services/users.service';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private addressService: AddressService,
    private stripeService: StripeService,
  ) {}

  @Get('me/profile')
  async getOwnProfile(@Req() req: Request) {
    const { _id: userId } = req.user as UserEntity;
    const user = await this.usersService.findOne({ _id: userId });
    const {
      _id,
      username,
      email,
      phone,
      isEmailVerified,
      isPhoneVerified,
      firstName,
      lastName,
      avatar,
      cover,
      role,
      dob,
      gender,
      status,
    } = user;

    return {
      _id,
      username,
      email,
      phone,
      isEmailVerified,
      isPhoneVerified,
      firstName,
      lastName,
      avatar,
      cover,
      role,
      dob,
      gender,
      status,
    };
  }

  @Put('me/profile')
  async updateProfile(
    @Req() req: Request,
    @Body(new ZodValidationPipeCustom(UpdateProfileSchema))
    data: UpdateProfileDto,
  ) {
    const { _id: userId } = req.user as UserEntity;
    const user = await this.usersService.updateUser(userId, data);

    const {
      _id,
      username,
      email,
      phone,
      isEmailVerified,
      isPhoneVerified,
      firstName,
      lastName,
      avatar,
      cover,
      role,
      dob,
      gender,
      status,
    } = user;

    return {
      _id,
      username,
      email,
      phone,
      isEmailVerified,
      isPhoneVerified,
      firstName,
      lastName,
      avatar,
      cover,
      role,
      dob,
      gender,
      status,
    };
  }

  @Get('me/payment-methods')
  async getListPaymentMethods(@Req() req: Request) {
    const { _id: userId } = req.user as UserEntity;
    let { customerId } = req.user as UserEntity;

    if (!customerId) {
      // Create customer
      const customer = await this.stripeService.createCustomer(
        req.user as UserEntity,
      );
      customerId = customer.id;

      // Update user
      await this.usersService.updateUser(userId, {
        customerId,
      });
    }

    return this.stripeService.getListPaymentMethods(customerId);
  }

  @Post('me/payment-methods')
  async addPaymentMethod(@Req() req: Request) {
    const { _id: userId } = req.user as UserEntity;
    let { customerId } = req.user as UserEntity;

    if (!customerId) {
      // Create customer
      const customer = await this.stripeService.createCustomer(
        req.user as UserEntity,
      );
      customerId = customer.id;

      // Update user
      await this.usersService.updateUser(userId, {
        customerId,
      });
    }

    return this.stripeService.createSetupIntent(customerId);
  }

  @Delete('me/payment-methods/:paymentMethodId')
  async deletePaymentMethod(@Param('paymentMethodId') paymentMethodId: string) {
    return this.stripeService.detachPaymentMethod(paymentMethodId);
  }

  @Post('me/addresses')
  async createAddress(
    @Req() req: Request,
    @Body(new ZodValidationPipeCustom(CreateAddressSchema))
    data: CreateAddressDto,
  ) {
    return this.addressService.createAddress(data, req.user as UserEntity);
  }

  @Get('me/addresses')
  async getAddresses(@Req() req: Request) {
    return this.addressService.getAddresses(req.user as UserEntity);
  }

  @Get('me/addresses/:addressId')
  async getAddress(@Req() req: Request, @Param('addressId') addressId: string) {
    return this.addressService.getAddress(addressId, req.user as UserEntity);
  }

  @Put('me/addresses/:addressId')
  async updateAddress(
    @Req() req: Request,
    @Param('addressId') addressId: string,
    @Body(new ZodValidationPipeCustom(UpdateAddressSchema))
    data: UpdateAddressDto,
  ) {
    return this.addressService.updateAddress(
      addressId,
      data,
      req.user as UserEntity,
    );
  }

  @Delete('me/addresses/:addressId')
  async deleteAddress(
    @Req() req: Request,
    @Param('addressId') addressId: string,
  ) {
    return this.addressService.deleteAddress(addressId, req.user as UserEntity);
  }
}

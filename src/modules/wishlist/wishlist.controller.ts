import { QueryParam } from '@common/decorators';
import { ZodValidationPipeCustom } from '@common/pipes';
import { WishQueryParams } from '@common/types';
import { UserEntity } from '@modules/users/entities';
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
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

import { CreateWishDto, CreateWishSchema } from './dtos';
import { UpdateWishDto, UpdateWishSchema } from './dtos/update-wish.dto';
import { WishlistService } from './wishlist.service';

@UseGuards(AuthGuard('jwt'))
@Controller('wishes')
export class WishlistController {
  constructor(private wishlistService: WishlistService) {}

  @Post()
  async createWish(
    @Req() req: Request,
    @Body(new ZodValidationPipeCustom(CreateWishSchema)) data: CreateWishDto,
  ) {
    const { user } = req;
    return this.wishlistService.createWish(data, user as UserEntity);
  }

  @Get()
  async getWishes(@Req() req: Request, @QueryParam() query: WishQueryParams) {
    const { user } = req;

    return this.wishlistService.getWishes({
      ...query,
      where: { user: (user as UserEntity)._id },
    });
  }

  @Get(':wishId')
  async getWish(@Req() req: Request, @Param('wishId') wishId: string) {
    return this.wishlistService.getWish(wishId);
  }

  @Put(':wishId')
  async editWish(
    @Param('wishId') wishId: string,
    @Body(new ZodValidationPipeCustom(UpdateWishSchema)) data: UpdateWishDto,
  ) {
    return this.wishlistService.editWish(wishId, data);
  }

  @Delete(':wishId')
  async deleteWish(@Param('wishId') wishId: string) {
    return this.wishlistService.deleteWish(wishId);
  }
}

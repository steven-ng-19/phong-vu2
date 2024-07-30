import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  UsePipes,
} from '@nestjs/common';

import { UserJwtAccessAuthGuard } from '@modules/auth/guards';
import { RequestUser } from '@common/decorators';
import { User } from '@modules/users/types';
import { CreateCartDto, FindCartByIdDto, UpdateQuantityCartDto } from '../dtos';
import { ZodValidationPipe } from '@anatine/zod-nestjs';
import { CartService } from '../services';
import { CartItem } from '@prisma/client';
import { SuccessResponse } from '@common/types';

@UseGuards(UserJwtAccessAuthGuard)
@Controller('carts')
export class CartController {
  constructor(private readonly _cartService: CartService) {}

  @Get('')
  getCarts(@RequestUser() user: User): Promise<CartItem[] | []> {
    return this._cartService.getCarts(user.id);
  }

  @Get(':id')
  getCart(@Param() params: FindCartByIdDto): Promise<CartItem> {
    return this._cartService.getCart(params);
  }

  @Post('add-to-cart')
  @UsePipes(new ZodValidationPipe())
  addToCart(
    @RequestUser() user: User,
    @Body() data: CreateCartDto,
  ): Promise<SuccessResponse<undefined>> {
    return this._cartService.addToCart(user.id, data);
  }

  @Patch('update-quantity/')
  @UsePipes(new ZodValidationPipe())
  updateQuantity(
    @Body() data: UpdateQuantityCartDto,
  ): Promise<SuccessResponse<undefined>> {
    return this._cartService.updateQuantity(data);
  }

  @Delete('remove-all')
  deleteAllProductInCart(@RequestUser() user: User): Promise<unknown> {
    return this._cartService.deleteAllProductInCart(user.id);
  }

  @Delete('remove-speific-product/:id')
  deleteSpecificProductInCart(
    @Param() params: FindCartByIdDto,
  ): Promise<unknown> {
    return this._cartService.deleteSpecificProductInCart(params.id);
  }
}

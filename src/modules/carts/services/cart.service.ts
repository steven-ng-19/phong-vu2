import { CART_ERRORS, PRODUCT_ERRORS } from 'src/content/errors';
import { CartCreateParams, CartUpdateParams } from '../types';
import { CreateCartDto, FindCartByIdDto, UpdateQuantityCartDto } from '../dtos';
import { Injectable, NotFoundException } from '@nestjs/common';

import { CartItem } from '@prisma/client';
import { CartMapper } from '../mappers';
import { PrismaService } from '@shared/prisma/prisma.service';
import { ProductService } from '@modules/products/services';
import { SuccessResponse } from '@common/types';

@Injectable()
export class CartService {
  constructor(
    private readonly _cartMapper: CartMapper,
    private readonly _prismaService: PrismaService,
    private readonly _productService: ProductService,
  ) {}

  /** ====================== Service of controller ====================== */

  async getCarts(userId: string): Promise<CartItem[]> {
    const mapped = this._cartMapper.findManyByKey({ userId });

    const result = await this._prismaService.cartItem.findMany(mapped);

    return result;
  }

  async getCart(params: FindCartByIdDto): Promise<CartItem> {
    const cartItem = await this.findOneById(params.id);

    if (!cartItem) throw new NotFoundException(CART_ERRORS.NOT_FOUND);

    return cartItem;
  }

  async addToCart(
    userId: string,
    data: CreateCartDto,
  ): Promise<SuccessResponse<undefined>> {
    const [isExist, product] = await Promise.all([
      this.findOneByUserIdAndProductId(userId, data.productId),
      this._productService.findOneById(data.productId),
    ]);

    // check product exist
    if (!product) throw new NotFoundException(PRODUCT_ERRORS.NOT_FOUND);

    // check cart item exist
    if (isExist) {
      const quantity = isExist.quantity + data.quantity;

      if (product.quantity < quantity)
        throw new NotFoundException(PRODUCT_ERRORS.QUANTITY);

      const params: CartUpdateParams = {
        quantity,
      };

      const mapped = this._cartMapper.update({ id: isExist.id }, params);

      await this._prismaService.cartItem.update(mapped);
    } else {
      const quantity = data.quantity;

      if (product.quantity < quantity)
        throw new NotFoundException(PRODUCT_ERRORS.QUANTITY);

      const params: CartCreateParams = {
        productId: data.productId,
        quantity,
        userId,
      };

      const mapped = this._cartMapper.create(params);

      await this._prismaService.cartItem.create(mapped);
    }

    return {
      success: true,
    };
  }

  async updateQuantity(
    data: UpdateQuantityCartDto,
  ): Promise<SuccessResponse<undefined>> {
    const [isExist, product] = await Promise.all([
      this.findOneByCartIdAndProductId(data.id, data.productId),
      this._productService.findOneById(data.productId),
    ]);

    // check cart item  exist
    if (!isExist) throw new NotFoundException(CART_ERRORS.NOT_FOUND);

    // check product exist
    if (!product) throw new NotFoundException(PRODUCT_ERRORS.NOT_FOUND);

    const quantity =
      data.status === 'increase' ? isExist.quantity + 1 : isExist.quantity - 1;

    if (product.quantity < quantity)
      throw new NotFoundException(PRODUCT_ERRORS.QUANTITY);

    // check if quantity < 0 remove product in cart
    if (quantity <= 0) {
      await this.deleteSpecificProductInCart(data.id);

      return {
        success: true,
      };
    }

    const params: CartUpdateParams = {
      quantity,
    };

    const mapped = this._cartMapper.update({ id: data.id }, params);

    await this._prismaService.cartItem.update(mapped);

    return {
      success: true,
    };
  }

  async deleteAllProductInCart(userId: string): Promise<unknown> {
    const mapped = this._cartMapper.deleteManyByKey({ userId });

    await this._prismaService.cartItem.deleteMany(mapped);

    return {};
  }

  async deleteSpecificProductInCart(cartItemId: string): Promise<unknown> {
    const isExist = await this.findOneById(cartItemId);

    if (!isExist) throw new NotFoundException(CART_ERRORS.NOT_FOUND);

    const mapped = this._cartMapper.deleteByKey({ id: cartItemId });

    await this._prismaService.cartItem.delete(mapped);

    return {};
  }

  /** ====================== Func general ====================== */
  async findOneByUserIdAndProductId(
    userId: string,
    productId: string,
  ): Promise<CartItem | null> {
    const mapped = this._cartMapper.findOneByKey({ userId, productId });

    const result = await this._prismaService.cartItem.findFirst(mapped);

    return result;
  }

  async findOneByUserIdAndCartId(
    userId: string,
    cartItemId: string,
  ): Promise<CartItem | null> {
    const mapped = this._cartMapper.findOneByKey({ userId, id: cartItemId });

    const result = await this._prismaService.cartItem.findFirst(mapped);

    return result;
  }

  async findOneByCartIdAndProductId(
    cartItemId: string,
    productId: string,
  ): Promise<CartItem | null> {
    const mapped = this._cartMapper.findOneByKey({ id: cartItemId, productId });

    const result = await this._prismaService.cartItem.findFirst(mapped);

    return result;
  }

  async findOneById(id: string): Promise<CartItem | null> {
    const mapped = this._cartMapper.findOneByKey({ id });

    const result = await this._prismaService.cartItem.findFirst(mapped);

    return result;
  }
}

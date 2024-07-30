import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateOrderDto } from '../dtos';
import { OrderCreateParams } from '../types/order.type';
import { OrderMapper } from '../mappers';
import { OrderStatus } from '@common/enums';
import { PRODUCT_ERRORS } from 'src/content/errors';
import { PrismaService } from '@shared/prisma/prisma.service';
import { ProductService } from '@modules/products/services';

@Injectable()
export class OrderService {
  constructor(
    private readonly _orderMapper: OrderMapper,
    private readonly _productService: ProductService,
    private readonly _prismaService: PrismaService,
  ) {}

  async create(userId: string, data: CreateOrderDto) {
    const { orderItems, notes, paymentId, paymentMethod, addressData } = data;
    let totalPriceInOrder = 0;

    // unique products
    const uniqueProducts = Array.from(
      new Map(
        orderItems.map((product) => [product.productId, product]),
      ).values(),
    );

    // check price and quantity
    await Promise.all(
      uniqueProducts.map(async (item, index) => {
        const isProduct = await this._productService.findOneById(
          item.productId,
        );

        if (!isProduct) throw new NotFoundException(PRODUCT_ERRORS.NOT_FOUND);

        const totalPrice = item.quantity * isProduct.price;

        const productDiscount =
          ((isProduct.discount ?? 0 * isProduct.price) / 100) * totalPrice;

        const totalPriceWithDiscount = totalPrice - productDiscount;

        if (
          totalPrice.toPrecision(2) !== item.totalPrice.toPrecision(2) ||
          totalPriceWithDiscount.toPrecision(2) !==
            item.totalPriceWithDiscount.toPrecision(2)
        )
          throw new NotFoundException(PRODUCT_ERRORS.PRICE);

        if (isProduct.quantity < item.quantity)
          throw new NotFoundException(PRODUCT_ERRORS.QUANTITY);

        totalPriceInOrder += totalPriceWithDiscount;

        uniqueProducts[index].productData = isProduct;

        return isProduct;
      }),
    );

    console.log('====================== Load product', uniqueProducts);

    const params: OrderCreateParams = {
      userId,
      notes: notes,
      paymentId: paymentId,
      paymentMethod: paymentMethod,
      status: OrderStatus.PENDING,
      totalPrice: totalPriceInOrder,
      addressData: addressData,
      orderItems: uniqueProducts,
    };

    const order = this._orderMapper.create(params);

    await this._prismaService.order.create(order);

    await Promise.all(
      uniqueProducts.map(async (item) => {
        await this._productService.decreaseQuantity(
          item.productId,
          item.quantity,
        );
      }),
    );

    return {
      success: true,
    };
  }
}

import {
  OrderCreateParams,
  OrderFindByKeyParams,
  OrderFindManyByKeyParams,
  OrderPrimaryKey,
  OrderUpdateParams,
} from '../types';

import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class OrderMapper {
  create(params: OrderCreateParams): Prisma.OrderCreateArgs {
    const { addressData, paymentDetails, orderItems, ...rest } = params;

    return {
      data: {
        ...rest,
        addressData: addressData
          ? JSON.parse(JSON.stringify(addressData))
          : null,
        paymentDetails: paymentDetails
          ? JSON.parse(JSON.stringify(paymentDetails))
          : null,
        orderItems: orderItems && {
          create: orderItems.map((item) => {
            return {
              productId: item.productId,
              quantity: item.quantity,
              discount: item.discount,
              totalPrice: item.totalPrice as number,
              totalPriceWithDiscount: item.totalPriceWithDiscount as number,
              productData: item.productData,
            };
          }),
        },
      },
    };
  }

  update(
    { id }: OrderPrimaryKey,
    data: OrderUpdateParams,
  ): Prisma.OrderUpdateArgs {
    return {
      where: { id },
      data,
    };
  }

  findOneByKey(params: OrderFindByKeyParams): Prisma.OrderFindFirstArgs {
    const { excludes = {}, ...rest } = params;
    return {
      where: {
        ...rest,
        ...Object.fromEntries(
          Object.entries(excludes).map(([key, value]) => [
            key,
            { notIn: value },
          ]),
        ),
        deletedAt: null,
      },
      include: {
        orderItems: true,
        user: true,
      },
    };
  }

  findManyByKey(params: OrderFindManyByKeyParams): Prisma.OrderFindManyArgs {
    const { excludes = {}, ...rest } = params;

    return {
      where: {
        ...rest,
        ...Object.fromEntries(
          Object.entries(excludes).map(([key, value]) => [
            key,
            { notIn: value },
          ]),
        ),
        deletedAt: null,
      },
      include: {
        orderItems: true,
      },
    };
  }

  deleteByKey(params: OrderPrimaryKey): Prisma.OrderDeleteArgs {
    const { id } = params;

    return {
      where: {
        id,
      },
    };
  }
}

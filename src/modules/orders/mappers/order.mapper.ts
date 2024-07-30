import { Injectable } from '@nestjs/common';
import { OrderCreateParams } from '../types/order.type';
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
              totalPrice: item.totalPrice,
              totalPriceWithDiscount: item.totalPriceWithDiscount,
              productData: item.productData,
            };
          }),
        },
      },
    };
  }
}

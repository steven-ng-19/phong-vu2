import { ADDRESS_ERRORS, ORDER_ERRORS } from 'src/content/errors';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateOrderDto, FindOrderByIdDto } from '../dtos';
import { Order, Prisma } from '@prisma/client';
import { PaginateResponse, SuccessResponse } from '@common/types';
import { allowedTransitionUser, allowedTransitionsAdmin } from '../configs';

import { AddressService } from '@modules/addresses/services';
import { ChangeStatusDto } from './../dtos/update-order.dto';
import { OrderCreateParams } from '../types';
import { OrderMapper } from '../mappers';
import { OrderStatus } from '@common/enums';
import { PRODUCT_ERRORS } from 'src/content/errors';
import { PrismaService } from '@shared/prisma/prisma.service';

@Injectable()
export class OrderService {
  constructor(
    private readonly _orderMapper: OrderMapper,
    private readonly _prismaService: PrismaService,
    private readonly _addressService: AddressService,
  ) {}

  /** ====================== Service of controller ====================== */

  async create(
    userId: string,
    data: CreateOrderDto,
  ): Promise<
    SuccessResponse<undefined> & { totalPriceInOrder: number; orderId: string }
  > {
    const { orderItems, notes, paymentId, paymentMethod, addressId } = data;
    let totalPriceInOrder: number = 0;
    // unique products
    const uniqueProducts = Array.from(
      new Map(
        orderItems.map((product) => [product.productId, product]),
      ).values(),
    );

    const address = await this._addressService.findOneById(addressId);

    if (!address) throw new NotFoundException(ADDRESS_ERRORS.NOT_FOUND);

    // check address

    try {
      return await this._prismaService.$transaction(
        async (trx) => {
          await Promise.all([
            await Promise.all(
              uniqueProducts.map(async (item, index) => {
                const isProduct = await trx.product.findUnique({
                  where: {
                    id: item.productId,
                  },
                });

                if (!isProduct)
                  throw new NotFoundException(PRODUCT_ERRORS.NOT_FOUND);

                const totalPrice = item.quantity * isProduct.price;

                const productDiscount =
                  ((isProduct.discount ?? 0 * isProduct.price) / 100) *
                  totalPrice;

                const totalPriceWithDiscount = totalPrice - productDiscount;

                if (isProduct.quantity < item.quantity)
                  throw new NotFoundException(PRODUCT_ERRORS.QUANTITY);

                totalPriceInOrder += totalPriceWithDiscount;

                uniqueProducts[index].productData = isProduct;
                uniqueProducts[index].totalPrice = parseFloat(
                  totalPrice.toFixed(2),
                );
                uniqueProducts[index].totalPriceWithDiscount = parseFloat(
                  totalPriceWithDiscount.toFixed(2),
                );
                return isProduct;
              }),
            ),
          ]);

          await Promise.all(
            uniqueProducts.map(async (item) => {
              await Promise.all([
                trx.product.update({
                  where: {
                    id: item.productId,
                  },
                  data: {
                    quantity: {
                      decrement: item.quantity,
                    },
                  },
                }),
                // can error if product not in cart item
                // TODO : check to fix
                trx.cartItem.deleteMany({
                  where: {
                    userId,
                    productId: item.productId,
                  },
                }),
              ]);
            }),
          );

          totalPriceInOrder = parseFloat(totalPriceInOrder.toFixed(2));

          const params: OrderCreateParams = {
            userId,
            notes: notes,
            paymentId: paymentId,
            paymentMethod: paymentMethod,
            status: OrderStatus.PENDING,
            totalPrice: totalPriceInOrder,
            addressData: address,
            orderItems: uniqueProducts,
          };

          const mapped = this._orderMapper.create(params);

          const order = await trx.order.create(mapped);

          return {
            success: true,
            totalPriceInOrder,
            orderId: order.id,
          };
        },
        {
          isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
        },
      );
    } catch (error) {
      throw new BadRequestException(error);
    }

    // check price and quantity
  }

  async changeStatus(
    params: FindOrderByIdDto,
    data: ChangeStatusDto,
    isAdmin: boolean = true,
  ): Promise<SuccessResponse<undefined>> {
    const order = await this.findOneById(params.id);

    if (!order) throw new NotFoundException(ORDER_ERRORS.NOT_FOUND);

    const currentStatus = order.status;

    const allowChangeStatus = isAdmin
      ? allowedTransitionsAdmin[currentStatus].includes(data.status)
      : allowedTransitionUser[currentStatus].includes(data.status);

    if (!allowChangeStatus)
      throw new BadRequestException(
        `Can not change status from ${currentStatus} to ${data.status}`,
      );

    const mapped = this._orderMapper.update(params, data);

    await this._prismaService.order.update(mapped);

    return {
      success: true,
    };
  }

  async update(
    params: FindOrderByIdDto,
    data: ChangeStatusDto & { paymentId: string },
  ): Promise<SuccessResponse<undefined>> {
    const order = await this.findOneById(params.id);

    if (!order) throw new NotFoundException(ORDER_ERRORS.NOT_FOUND);

    const mapped = this._orderMapper.update(params, data);

    await this._prismaService.order.update(mapped);

    return {
      success: true,
    };
  }

  async findOne(params: FindOrderByIdDto): Promise<Order | null> {
    const order = await this.findOneById(params.id);

    if (!order) throw new NotFoundException(ORDER_ERRORS.NOT_FOUND);

    const { addressData, paymentDetails, ...rest } = order;

    return {
      ...rest,
      paymentDetails: paymentDetails as Prisma.JsonValue,
      addressData: addressData as Prisma.JsonValue,
    };
  }

  async findMany(
    query: Prisma.OrderFindManyArgs,
  ): Promise<PaginateResponse<Order>> {
    const [count, order] = await Promise.all([
      this._prismaService.order.count({
        where: { ...query.where },
      }),
      this._prismaService.order.findMany({
        ...query,
        where: { ...query.where },
      }),
    ]);

    return {
      count,
      data: order,
    };
  }

  async delete(params: FindOrderByIdDto): Promise<SuccessResponse<undefined>> {
    const order = await this.findOneById(params.id);

    if (!order) throw new NotFoundException(ORDER_ERRORS.NOT_FOUND);

    const mapped = this._orderMapper.deleteByKey(params);

    const result = await this._prismaService.order.delete(mapped);

    if (result) {
      return {
        success: true,
      };
    }

    return {
      success: false,
    };
  }

  /** ====================== CRUD Base ====================== */

  async findOneById(id: string): Promise<Order | null> {
    const mapped = this._orderMapper.findOneByKey({ id });

    const order = await this._prismaService.order.findFirst(mapped);

    return order;
  }
}

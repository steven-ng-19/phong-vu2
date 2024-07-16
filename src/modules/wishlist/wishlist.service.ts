import { WishQueryParams } from '@common/types';
import { ProductEntity } from '@modules/products/entities';
import { User } from '@modules/users/models';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { PRODUCT_MODEL } from '../products/models';
import { CreateWishDto } from './dtos';
import { UpdateWishDto } from './dtos/update-wish.dto';
import { WishEntity } from './entities';
import { WISH_MODEL } from './models/wish.schema';

@Injectable()
export class WishlistService {
  constructor(
    @InjectModel(WISH_MODEL) private wishModel: Model<WishEntity>,
    @InjectModel(PRODUCT_MODEL) private productModel: Model<ProductEntity>,
  ) {}

  async createWish(data: CreateWishDto, user: User) {
    try {
      const { productId, ...wishData } = data;
      const product = await this.productModel.findById(productId).lean();
      if (!product) throw new Error('Product not found');

      return this.wishModel.findOneAndUpdate(
        { user: user._id, product: product._id },
        { ...wishData },
        { upsert: true, new: true },
      );
    } catch (error: any) {
      throw new BadRequestException(error.message ?? error);
    }
  }

  async getWishes(query?: WishQueryParams) {
    const {
      page = 1,
      limit = 10,
      search = '',
      sort = { createdAt: 'desc' },
      where = {},
      populate = ['product'],
    } = query;

    const queryObj = {
      ...where,
      ...(search && {
        $or: [
          {
            'product.name': {
              $regex: search,
              $options: 'i',
            },
          },
          {
            'product.description': {
              $regex: search,
              $options: 'i',
            },
          },
        ],
      }),
    };

    const [wishes, count] = await Promise.all([
      this.wishModel
        .find(queryObj)
        .skip((page - 1) * limit)
        .limit(limit)
        .populate(populate)
        .sort(sort)
        .lean(),
      this.wishModel.countDocuments(queryObj),
    ]);

    return {
      page,
      limit,
      totalRow: count,
      totalPage: Math.ceil(count / limit),
      data: wishes,
    };
  }

  async getWish(wishId: string, populate: string[] = ['product']) {
    return this.wishModel.findById(wishId).populate(populate).lean();
  }

  async editWish(wishId: string, data: UpdateWishDto) {
    return this.wishModel.findByIdAndUpdate(wishId, data, { new: true });
  }

  async deleteWish(wishId: string) {
    return this.wishModel.findByIdAndDelete(wishId);
  }
}

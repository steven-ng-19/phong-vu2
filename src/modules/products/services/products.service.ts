import { ProductQueryParams } from '@common/types';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateProductDto } from '../dtos';
import { UpdateProductDto } from '../dtos/update-product.dto';
import { ProductEntity } from '../entities';
import { PRODUCT_MODEL } from '../models';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(PRODUCT_MODEL) private productModel: Model<ProductEntity>,
  ) {}

  async createProduct(data: CreateProductDto) {
    const { sku, galleries = [], ...productData } = data;

    // Check if SKU is unique
    const isExist = await this.productModel.exists({ sku });
    if (isExist) throw new BadRequestException('SKU is already exist');

    const orderedGalleries = galleries.map((gallery, index) => ({
      //TODO after fix
      ...gallery,
      order: index,
    }));

    return await this.productModel.create({
      ...productData,
      sku,
      galleries: orderedGalleries,
    });
  }

  async getProducts(query: ProductQueryParams) {
    const {
      page = 1,
      limit = 10,
      search = '',
      sort = { createdAt: 'desc' },
      where = {},
    } = query;

    const queryObj: Record<string, unknown> = {
      ...where,
      name: { $regex: search, $options: 'i' },
    };

    const [products, count] = await Promise.all([
      this.productModel
        .find(queryObj, null, { limit, skip: (page - 1) * limit })
        .select(['-galleries'])
        .populate(['category'])
        .sort(sort)
        .lean(),

      this.productModel.countDocuments(queryObj),
    ]);

    return {
      page,
      limit,
      totalRow: count,
      totalPage: Math.ceil(count / limit),
      data: products,
    };
  }

  async getProduct(id: string) {
    return await this.productModel.findById(id).populate(['category']).lean();
  }

  async updateProduct(id: string, data: UpdateProductDto) {
    return this.productModel.findByIdAndUpdate(id, data, { new: true }).lean();
  }

  async deleteProduct(id: string) {
    await this.productModel.findByIdAndDelete(id).lean();
  }
}

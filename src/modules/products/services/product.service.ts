import { CATEGORY_ERRORS, PRODUCT_ERRORS } from 'src/content/errors';
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto, UpdateProductDto } from '../dtos';
import { PaginateResponse, SuccessResponse } from '@common/types';
import { Prisma, Product } from '@prisma/client';
import {
  ProductCreateParams,
  ProductFindByConditionsParams,
  ProductUpdateParams,
} from '../types';

import { CategoryService } from '@modules/categories/services';
import { PrismaService } from '@shared/prisma/prisma.service';
import { ProductMapper } from '../mappers';
import { generateSlug } from '@common/utils';

@Injectable()
export class ProductService {
  constructor(
    private readonly _productMapper: ProductMapper,
    private readonly _prismaService: PrismaService,
    private readonly _categoryService: CategoryService,
  ) {}

  /** ====================== Service of controller ====================== */
  async create(data: CreateProductDto): Promise<SuccessResponse<undefined>> {
    const { sku, galleries = [], categoryId, ...productData } = data;

    // check SKU is unique
    const isExist = await this.findOneWithConditions({ sku });

    if (isExist) throw new ConflictException(PRODUCT_ERRORS.SKU);

    // check category exist
    const category = await this._categoryService.findOne(categoryId);

    if (!category) throw new NotFoundException(CATEGORY_ERRORS.NOT_FOUND);

    const orderedGalleries = galleries.map((gallery, index) => ({
      //TODO after fix
      ...gallery,
      order: index,
    }));

    const params: ProductCreateParams = {
      ...productData,
      sku,
      categoryId,
      galleries: orderedGalleries,
      slug: generateSlug(productData.name),
    };

    const mapped = this._productMapper.create(params);

    await this._prismaService.product.create(mapped);

    return {
      success: true,
    };
  }

  async findMany(
    query: Prisma.ProductFindManyArgs,
  ): Promise<PaginateResponse<Product>> {
    const [count, product] = await Promise.all([
      this._prismaService.product.count({
        where: { ...query.where },
      }),
      this._prismaService.product.findMany({
        ...query,
        where: { ...query.where },
        select: {
          id: true,
          name: true,
          description: true,
          createdAt: true,
          image: true,
          sku: true,
          price: true,
          quantity: true,
          slug: true,
          galleries: true,
        },
      }),
    ]);

    return { count, data: product };
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.findOneById(id);

    if (!product) throw new NotFoundException(PRODUCT_ERRORS.NOT_FOUND);

    return product;
  }

  async update(
    id: string,
    data: UpdateProductDto,
  ): Promise<SuccessResponse<undefined>> {
    const { categoryId, galleries, name, sku, ...productData } = data;

    const [product, category] = await Promise.all([
      await this.findOneById(id),
      categoryId && (await this._categoryService.findOneById(categoryId)),
    ]);

    if (!product) throw new NotFoundException(PRODUCT_ERRORS.NOT_FOUND);

    if (product && product.sku === sku)
      throw new ConflictException(PRODUCT_ERRORS.SKU);

    if (categoryId && !category)
      throw new NotFoundException(CATEGORY_ERRORS.NOT_FOUND);

    const params: ProductUpdateParams = {
      ...productData,
      categoryId: categoryId ? categoryId : undefined,
      slug: name ? generateSlug(name) : undefined,
      galleries: galleries
        ? galleries.map((gallery, index) => ({
            ...gallery,
            order: index,
          }))
        : undefined,
    };

    const mapped = this._productMapper.update({ id }, params);

    await this._prismaService.product.update(mapped);

    return {
      success: true,
    };
  }

  async delete(id: string): Promise<unknown> {
    const product = await this.findOneById(id);

    if (!product) throw new NotFoundException(PRODUCT_ERRORS.NOT_FOUND);

    const mapped = this._productMapper.delete({ id });

    await this._prismaService.product.update(mapped);

    return {};
  }

  /** ====================== General ====================== */

  async findOneWithConditions(
    params: ProductFindByConditionsParams,
  ): Promise<Product | null> {
    const mapped = this._productMapper.findOne(params);

    const result = await this._prismaService.product.findFirst(mapped);

    return result;
  }

  async findOneById(id: string): Promise<Product | null> {
    const mapped = this._productMapper.findOneByKey({ id });

    const result = await this._prismaService.product.findFirst(mapped);

    return result;
  }

  async decreaseQuantity(
    productId: string,
    quantity: number,
  ): Promise<Product> {
    const mapped = this._productMapper.update({ id: productId }, { quantity });

    const result = await this._prismaService.product.update(mapped);

    return result;
  }
}

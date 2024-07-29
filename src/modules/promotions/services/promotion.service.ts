import { Injectable, NotFoundException } from '@nestjs/common';
import { PRODUCT_ERRORS, PROMOTION_ERRORS } from 'src/content/errors';
import { PaginateResponse, SuccessResponse } from '@common/types';
import { Prisma, Promotion } from '@prisma/client';
import { PromotionCreateParams, PromotionUpdateParams } from '../types';

import { CreatePromotionDto } from '../dtos/create-promotion.dto';
import { FindPromotionByIdDto } from '../dtos/find-promotion.dto';
import { PrismaService } from '@shared/prisma/prisma.service';
import { ProductService } from '@modules/products/services';
import { PromotionMapper } from '../mappers';
import { UpdatePromotionDto } from '../dtos';

@Injectable()
export class PromotionService {
  constructor(
    private readonly _promotionMapper: PromotionMapper,
    private readonly _prismaService: PrismaService,
    private readonly _productService: ProductService,
  ) {}

  /** ====================== Service of controller ====================== */
  async create(data: CreatePromotionDto): Promise<SuccessResponse<undefined>> {
    const { benefit, ...rest } = data;

    // check sku of product
    await Promise.all(
      benefit.gifts.map(async (gift) => {
        const isSku = await this._productService.findOneWithConditions({
          sku: gift.sku,
        });

        if (!isSku) throw new NotFoundException(PRODUCT_ERRORS.SKU_INVALID);
      }),
    );

    const params: PromotionCreateParams = {
      ...rest,
      benefit,
    };

    const mapped = this._promotionMapper.create(params);

    await this._prismaService.promotion.create(mapped);

    return {
      success: true,
    };
  }

  async update(
    id: string,
    data: UpdatePromotionDto,
  ): Promise<SuccessResponse<undefined>> {
    const { benefit, ...rest } = data;

    // check sku of product
    benefit &&
      (await Promise.all(
        benefit.gifts.map(async (gift) => {
          const isSku = await this._productService.findOneWithConditions({
            sku: gift.sku,
          });

          if (!isSku) throw new NotFoundException(PRODUCT_ERRORS.SKU_INVALID);
        }),
      ));

    const params: PromotionUpdateParams = {
      ...rest,
      benefit,
    };

    const mapped = this._promotionMapper.update({ id }, params);

    await this._prismaService.promotion.update(mapped);

    return {
      success: true,
    };
  }

  async findMany(
    query: Prisma.PromotionFindManyArgs,
  ): Promise<PaginateResponse<Promotion>> {
    const [count, promotion] = await Promise.all([
      this._prismaService.promotion.count({
        where: { ...query.where },
      }),
      this._prismaService.promotion.findMany({
        ...query,
        where: { ...query.where },
        include: {
          benefit: { include: { discount: true, gifts: true } },
          condition: true,
        },
      }),
    ]);

    return { count, data: promotion };
  }

  async findOne(params: FindPromotionByIdDto): Promise<Promotion> {
    const { id } = params;

    const promotion = await this.findOneById(id);

    if (!promotion) throw new NotFoundException(PROMOTION_ERRORS.NOT_FOUND);

    return promotion;
  }

  async delete(params: FindPromotionByIdDto): Promise<unknown> {
    const { id } = params;

    const promotion = await this.findOneById(id);

    if (!promotion) throw new NotFoundException(PROMOTION_ERRORS.NOT_FOUND);

    const mapped = this._promotionMapper.delete({ id });

    await this._prismaService.promotion.update(mapped);

    return {};
  }

  /** ====================== CRUD Base ====================== */

  async findOneById(id: string): Promise<Promotion | null> {
    const promotion = this._promotionMapper.findOneByKey({ id });

    const result = await this._prismaService.promotion.findFirst(promotion);

    return result;
  }
}

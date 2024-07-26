import { Category, CategoryCreateParams, CategoryUpdateParams } from '../types';
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  CreateCategoryDto,
  FindCategoryByIdDto,
  UpdateCategoryDto,
} from '../dtos';
import { PaginateResponse, SuccessResponse } from '@common/types';

import { CATEGORY_ERRORS } from 'src/content/errors';
import { CategoryMapper } from '../mappers';
import { Prisma } from '@prisma/client';
import { PrismaService } from '@shared/prisma/prisma.service';
import { generateSlug } from '@common/utils';

@Injectable()
export class CategoryService {
  constructor(
    private readonly _categoryMapper: CategoryMapper,
    private readonly _prismaService: PrismaService,
  ) {}
  /** ====================== Service of controller ====================== */
  async create(data: CreateCategoryDto): Promise<SuccessResponse<undefined>> {
    const isExist = await this.findOneByName(data.name);

    if (isExist) throw new ConflictException(CATEGORY_ERRORS.NAME_EXIST);

    const params: CategoryCreateParams = {
      name: data.name,
      description: data.description,
      image: data.image,
      isDeprecated: false,
      slug: generateSlug(data.name),
    };

    const mapped = this._categoryMapper.create(params);

    await this._prismaService.category.create(mapped);

    return {
      success: true,
    };
  }

  async findMany(
    query: Prisma.CategoryFindManyArgs,
  ): Promise<PaginateResponse<Category>> {
    const [count, category] = await Promise.all([
      this._prismaService.category.count({
        where: { ...query.where, isDeprecated: false },
      }),
      this._prismaService.category.findMany({
        ...query,
        where: { ...query.where, isDeprecated: false },
        select: {
          id: true,
          name: true,
          description: true,
          createdAt: true,
        },
      }),
    ]);

    return { count, data: category };
  }

  async findOne(id: string): Promise<Category> {
    const category = await this.findOneById(id);

    if (!category) throw new NotFoundException(CATEGORY_ERRORS.NOT_FOUND);

    return category;
  }

  async update(
    id: string,
    data: UpdateCategoryDto,
  ): Promise<SuccessResponse<undefined>> {
    const category = await this.findOneById(id);

    if (!category) throw new NotFoundException(CATEGORY_ERRORS.NOT_FOUND);

    const params: CategoryUpdateParams = {
      ...data,
      slug: data.name ? generateSlug(data.name) : undefined,
    };

    const mapped = this._categoryMapper.update({ id }, params);

    await this._prismaService.category.update(mapped);

    return {
      success: true,
    };
  }

  async delete(id: string): Promise<unknown> {
    const category = await this.findOneById(id);

    if (!category) throw new NotFoundException(CATEGORY_ERRORS.NOT_FOUND);

    const mapped = this._categoryMapper.delete({ id });

    await this._prismaService.category.update(mapped);

    return {};
  }

  /** ====================== CRUD Base ====================== */

  async findOneById(id: string) {
    const mapped = this._categoryMapper.findOneByKey({ id });

    const result = await this._prismaService.category.findFirst(mapped);

    return result;
  }

  async findOneByName(name: string) {
    const mapped = this._categoryMapper.findOneByKey({ name });

    const result = await this._prismaService.category.findFirst(mapped);

    return result;
  }
}

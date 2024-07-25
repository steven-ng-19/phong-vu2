import { Category, CategoryCreateParams } from '../types';

import { CategoryMapper } from '../mappers';
import { CreateCategoryDto } from '../dtos';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '@shared/prisma/prisma.service';
import { generateSlug } from '@common/utils';

@Injectable()
export class CategoryService {
  constructor(
    private readonly _categoryMapper: CategoryMapper,
    private readonly _prismaService: PrismaService,
  ) {}

  async create(data: CreateCategoryDto) {
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
  ): Promise<{ count: number; data: Partial<Category>[] }> {
    const [count, category] = await Promise.all([
      this._prismaService.category.count({
        where: { ...query.where },
      }),
      this._prismaService.category.findMany({
        ...query,
        where: { ...query.where },
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
}

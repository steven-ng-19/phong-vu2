import { BaseQueryParams } from '@common/types';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateCategoryDto, UpdateCategoryDto } from '../dtos';
import { CategoryEntity } from '../entities';
import { CATEGORY_MODEL } from '../models/category.schema';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(CATEGORY_MODEL) private categoryModel: Model<CategoryEntity>,
  ) {}

  async createCategory(data: CreateCategoryDto) {
    return this.categoryModel.create(data);
  }

  async getCategories(query: BaseQueryParams) {
    const { page = 1, limit = 10, search = '', sort = { name: 'asc' } } = query;

    const queryObj = {
      name: { $regex: search, $options: 'i' },
    };

    const [categories, count] = await Promise.all([
      this.categoryModel
        .find(queryObj, null, { limit, skip: (page - 1) * limit })
        .sort(sort)
        .lean(),
      this.categoryModel.countDocuments(queryObj),
    ]);

    return {
      page,
      limit,
      totalRow: count,
      totalPage: Math.ceil(count / limit),
      data: categories,
    };
  }

  async getCategory(id: string) {
    return this.categoryModel.findById(id).lean();
  }

  async updateCategory(id: string, data: UpdateCategoryDto) {
    return this.categoryModel.findByIdAndUpdate(id, data, { new: true }).lean();
  }

  async deleteCategory(id: string) {
    await this.categoryModel.findByIdAndDelete(id).lean();
  }
}

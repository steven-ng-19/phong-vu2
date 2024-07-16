import {
  DEFAULT_ADMIN_EMAIL,
  DEFAULT_ADMIN_PASSWORD,
  DEFAULT_ADMIN_USERNAME,
} from '@common/constants';
import { Gender, UserRole, UserStatus } from '@common/enums';
import { StatisticsQueryParams } from '@common/types';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcryptjs';
import { Model } from 'mongoose';

import { RegisterDto } from '../../auth/dtos';
import { UserEntity } from '../entities';
import { USER_MODEL, User } from '../models';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(USER_MODEL) private userModel: Model<UserEntity>,
    private configService: ConfigService,
  ) {}

  async createDefaultAdminUser(): Promise<User> {
    // Check if admin user already exists
    const adminUser = await this.userModel
      .findOne({
        username: this.configService.get<string>(DEFAULT_ADMIN_USERNAME),
        role: UserRole.SUPER_ADMIN,
      })
      .lean();
    if (adminUser) return;

    // Create admin user
    await this.userModel.create({
      username: this.configService.get<string>(DEFAULT_ADMIN_USERNAME),
      email: this.configService.get<string>(DEFAULT_ADMIN_EMAIL),
      hashPassword: bcrypt.hashSync(
        this.configService.get<string>(DEFAULT_ADMIN_PASSWORD),
        10,
      ),
      firstName: 'Super',
      lastName: 'Admin',
      role: UserRole.SUPER_ADMIN,
      status: UserStatus.ACTIVE,
      isEmailVerified: true,
      isPhoneVerified: true,
    });
  }

  async createUser(data: RegisterDto) {
    const { password } = data;
    const hashPassword = bcrypt.hashSync(password, 10);
    return this.userModel.create({
      ...data,
      hashPassword,
    });
  }

  /**
   * Find user by username
   * @param username - username or email or phone
   * @returns UserDocument
   */
  async findUser(username: string): Promise<User> {
    const user = await this.userModel
      .findOne({
        $or: [{ username }, { email: username }, { phone: username }],
      })
      .lean();
    return user;
  }

  async findOne(conditions: any): Promise<User> {
    return this.userModel.findOne(conditions).lean();
  }

  async updateUser(userId: string, data: any): Promise<User> {
    return this.userModel.findByIdAndUpdate(userId, data, { new: true }).lean();
  }

  /**
   * Get user statistics overview
   * @returns UserStatistics
   */
  async getUserStatistics(
    query?: StatisticsQueryParams,
  ): Promise<{ total: number; male: number; female: number; other: number }> {
    const { where: { fromDate, toDate } = { fromDate: null, toDate: null } } =
      query;

    const matchCondition: Record<string, unknown> = {};
    // Filter by role
    matchCondition.role = { $eq: UserRole.USER };

    // Filter by date
    if (fromDate && toDate) {
      matchCondition.createdAt = {
        $gte: new Date(fromDate),
        $lte: new Date(toDate),
      };
    } else {
      if (fromDate) {
        matchCondition.createdAt = { $gte: new Date(fromDate) };
      }

      if (toDate) {
        matchCondition.createdAt = { $lte: new Date(toDate) };
      }
    }

    const result = await this.userModel.aggregate([
      { $match: matchCondition },
      {
        $facet: {
          total: [{ $count: 'count' }],
          male: [
            { $match: { gender: { $eq: Gender.MALE } } },
            { $count: 'count' },
          ],
          female: [
            { $match: { gender: { $eq: Gender.FEMALE } } },
            { $count: 'count' },
          ],
          other: [
            { $match: { gender: { $eq: Gender.OTHER } } },
            { $count: 'count' },
          ],
        },
      },
      {
        $project: {
          total: { $arrayElemAt: ['$total.count', 0] },
          male: { $arrayElemAt: ['$male.count', 0] },
          female: { $arrayElemAt: ['$female.count', 0] },
          other: { $arrayElemAt: ['$other.count', 0] },
        },
      },
      {
        $addFields: {
          total: { $ifNull: ['$total', 0] },
          male: { $ifNull: ['$male', 0] },
          female: { $ifNull: ['$female', 0] },
          other: { $ifNull: ['$other', 0] },
        },
      },
    ]);

    return result[0];
  }
}

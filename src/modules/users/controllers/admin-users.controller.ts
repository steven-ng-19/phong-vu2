import { QueryParam, Roles } from '@common/decorators';
import { UserRole } from '@common/enums';
import { StatisticsQueryParams } from '@common/types';
import { Controller, Get, UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from '../../auth/guards';
import { UsersService } from '../services/users.service';

@UseGuards(JwtAuthGuard)
@Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
@Controller('admin/users')
export class AdminUsersController {
  constructor(private usersService: UsersService) {}

  @Get('statistics')
  async getUserStatistics(@QueryParam() query: StatisticsQueryParams) {
    return this.usersService.getUserStatistics(query);
  }
}

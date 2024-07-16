import { Body, Controller, Post, Put, Req, UseGuards } from '@nestjs/common';
import { FirsebaseService } from '@shared/firsebase/services';
import { Request } from 'express';

import { JwtAuthGuard } from '../../auth/guards';
import { UserEntity } from '../entities';
import { UsersService } from '../services/users.service';

@UseGuards(JwtAuthGuard)
@Controller('notifications')
export class NotifiationsController {
  constructor(private usersService: UsersService) {}

  @Post('devices')
  async addDevice(
    @Req() req: Request,
    @Body('registrationToken') newRegistrationToken: string,
  ) {
    const { _id: userId, registrationTokens = [] } = req.user as UserEntity;
    if (newRegistrationToken) {
      registrationTokens.push(newRegistrationToken);
    }

    await this.usersService.updateUser(userId, {
      registrationTokens: [...new Set(registrationTokens)],
    });
  }

  @Put('devices')
  async removeDevice(
    @Req() req: Request,
    @Body('registrationToken') removeRegistrationToken: string,
  ) {
    const { _id: userId, registrationTokens = [] } = req.user as UserEntity;
    if (removeRegistrationToken) {
      const filteredRegistrationTokens = registrationTokens.filter(
        (registrationToken) => registrationToken !== removeRegistrationToken,
      );

      await this.usersService.updateUser(userId, {
        registrationTokens: filteredRegistrationTokens,
      });
    }
  }
}

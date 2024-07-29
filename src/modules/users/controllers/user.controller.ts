import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  UseGuards,
} from '@nestjs/common';

import { UserService } from '../services';
import { RequestUser } from '@common/decorators';
import { User } from '../types/user.type';
import { UpdateOwnProfileDto } from '../dtos';
import { UserJwtAccessAuthGuard } from '@modules/auth/guards';

@Controller('users')
export class UserController {
  constructor(private readonly _userService: UserService) {}

  // get me
  @Get('me/profile')
  @UseGuards(UserJwtAccessAuthGuard)
  getOwnProfile(@RequestUser() user: User) {
    const {
      id,
      email,
      firstName,
      lastName,
      phone,
      userName,
      gender,
      avatar,
      cover,
      dob,
      createdAt,
    } = user;

    return {
      id,
      email,
      firstName,
      lastName,
      phone,
      userName,
      gender,
      avatar,
      cover,
      dob,
      createdAt,
    };
  }

  // TODO not using with api that using with webhook clerk to update profile
  // update profile
  @Post('me/profile/:id')
  updateOwnProfile(
    @Body() data: UpdateOwnProfileDto,
    @Param('id', new ParseUUIDPipe()) id: string,
  ) {
    return this._userService.updateOwnProfile(id, data);
  }
}

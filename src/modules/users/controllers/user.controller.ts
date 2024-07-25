import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { UserService } from '../services';
import { RequestUser } from '@common/decorators';
import { User } from '../types/user.type';
import { UpdateOwnProfileDto } from '../dtos';

@Controller('users')
export class UserController {
  constructor(private readonly _userService: UserService) {}

  // get me
  @Get('me/profile')
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

  // update profile
  @Post('me/profile/:id')
  updateOwnProfile(@Body() data: UpdateOwnProfileDto, @Param('id') id: string) {
    return this._userService.updateOwnProfile(id, data);
  }
}

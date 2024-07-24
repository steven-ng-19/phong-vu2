import { LocalAuthGuard } from '../guards';
import { Body, Controller, Post, UseGuards, UsePipes } from '@nestjs/common';

import { ZodValidationPipe } from '@anatine/zod-nestjs';
import {
  ForgotPasswordDto,
  RefreshTokenDto,
  RegisterRequestDto,
  ResetPasswordDto,
} from '../dtos';
import { AuthService } from '../services';
import { RequestUser } from '@common/decorators';
import { User } from '@modules/users/types/user.type';

@Controller('admin/auth')
export class UserAuthController {
  constructor(private readonly _authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  login(@RequestUser() user: User) {
    return this._authService.userLogin(user);
  }

  @Post('refresh-token')
  @UsePipes(ZodValidationPipe)
  refreshToken(@Body() data: RefreshTokenDto) {
    return this._authService.userRefreshToken(data);
  }

  @Post('forgot-password')
  @UsePipes(ZodValidationPipe)
  forgotPassword(@Body() data: ForgotPasswordDto) {
    return this._authService.forgotPassword(data);
  }

  @Post('reset-password')
  @UsePipes(ZodValidationPipe)
  resetPassword(@Body() data: ResetPasswordDto) {
    return this._authService.resetPassword(data);
  }
}

import { LocalAuthGuard, UserJwtAccessAuthGuard } from './../guards';
import {
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
  UsePipes,
} from '@nestjs/common';

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
import { ClerkService } from '@shared/clerk/clerk.service';

@Controller('user/auth')
export class UserAuthController {
  constructor(
    private readonly _authService: AuthService,
    private readonly _clerkService: ClerkService,
  ) {}

  @Post('register')
  @UsePipes(ZodValidationPipe)
  register(@Body() data: RegisterRequestDto) {
    return this._authService.register(data);
  }

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

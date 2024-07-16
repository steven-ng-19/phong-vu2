import { ZodValidationPipeCustom } from '@common/pipes';
import { User } from '@modules/users/models';
import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';

import {
  ForgotPasswordDto,
  ForgotPasswordSchema,
  RefreshTokenDto,
  RefreshTokenSchema,
  RegisterDto,
  RegisterSchema,
  ResetPasswordDto,
  ResetPasswordSchema,
} from '../dtos';
import { LocalAuthGuard } from '../guards';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(
    @Body(new ZodValidationPipeCustom(RegisterSchema)) data: RegisterDto,
  ) {
    return this.authService.register(data);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req: Request, @Res() res: Response) {
    const result = await this.authService.login(req.user as User);

    return res.status(200).json({ data: result });
  }

  @Post('refresh-token')
  async refreshToken(
    @Body(new ZodValidationPipeCustom(RefreshTokenSchema))
    data: RefreshTokenDto,
    @Res() res: Response,
  ) {
    const { refreshToken } = data;
    const result = await this.authService.refreshToken(refreshToken);

    res.status(200).json({ data: result });
  }

  @Post('forgot-password')
  async forgotPassword(
    @Body(new ZodValidationPipeCustom(ForgotPasswordSchema))
    data: ForgotPasswordDto,
    @Res() res: Response,
  ) {
    const { resetPasswordToken } = await this.authService.forgotPassword(data);

    res.status(200).json({ data: { resetPasswordToken } });
  }

  @Post('reset-password')
  async resetPassword(
    @Body(new ZodValidationPipeCustom(ResetPasswordSchema))
    data: ResetPasswordDto,
  ) {
    return this.authService.resetPassword(data);
  }
}

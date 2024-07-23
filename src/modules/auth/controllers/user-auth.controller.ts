import { LocalAuthGuard } from './../guards';
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
import { SendMailService } from '@shared/email/send-mail.service';
import { readTemplate } from '@common/utils/template.util';

@Controller('user/auth')
export class UserAuthController {
  constructor(
    private readonly _authService: AuthService,
    private readonly _sendMailService: SendMailService,
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

  @Post('send-mail')
  async sendMail() {
    const html = readTemplate({
      title: 'Test send mail',
      content: 'Send mail content',
      titleLink: 'title link',
      link: 'link',
    });

    await this._sendMailService.sendMail({
      to: 'dangvanphuc7122001@gmail.com',
      text: 'Hello ',
      subject: ' Test send mail',
      html: html,
    });

    return {
      success: true,
    };
  }
}

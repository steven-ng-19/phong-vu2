import { Body, Controller, Post, UsePipes } from '@nestjs/common';

import { ZodValidationPipe } from '@anatine/zod-nestjs';
import { LoginDto } from '../dtos';
import { AuthService } from '../services';

@Controller('admin/auth')
export class UserAuthController {
  constructor(private readonly _authService: AuthService) {}

  @Post('login')
  @UsePipes(ZodValidationPipe)
  login(@Body() data: LoginDto) {
    return this._authService.adminLogin(data);
  }
}

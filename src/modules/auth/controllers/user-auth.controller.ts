import { Body, Controller, Post, UsePipes } from '@nestjs/common';

import { ZodValidationPipe } from '@anatine/zod-nestjs';
import { RegisterRequestDto } from '../dtos';
import { AuthService } from '../services';

@Controller('user/auth')
export class UserAuthController {
  constructor(private readonly _authService: AuthService) {}

  @Post('register')
  @UsePipes(ZodValidationPipe)
  register(@Body() data: RegisterRequestDto) {
    return this._authService.register(data);
  }
}

import { Body, Controller, Post, UseGuards, UsePipes } from '@nestjs/common';

import { ZodValidationPipe } from '@anatine/zod-nestjs';
import { LoginDto, RegisterRequestDto } from '../dtos';
import { AuthService } from '../services';

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
  @UsePipes(ZodValidationPipe)
  login(@Body() data: LoginDto) {
    return this._authService.userLogin(data);
  }
}

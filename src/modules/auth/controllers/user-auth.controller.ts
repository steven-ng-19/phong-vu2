import { Body, Controller, Post, UseGuards, UsePipes } from '@nestjs/common';

import { ZodValidationPipe } from '@anatine/zod-nestjs';
import { LoginDto, RegisterRequestDto } from '../dtos';
import { AuthService } from '../services';

import { ClerkService } from '@shared/clerk/clerk.service';
import { SuccessResponse } from '@common/types';

@Controller('user/auth')
export class UserAuthController {
  constructor(private readonly _authService: AuthService) {}

  @Post('register')
  @UsePipes(ZodValidationPipe)
  register(
    @Body() data: RegisterRequestDto,
  ): Promise<SuccessResponse<undefined>> {
    return this._authService.register(data);
  }

  @Post('login')
  @UsePipes(ZodValidationPipe)
  login(@Body() data: LoginDto): Promise<SuccessResponse<undefined>> {
    return this._authService.userLogin(data);
  }
}

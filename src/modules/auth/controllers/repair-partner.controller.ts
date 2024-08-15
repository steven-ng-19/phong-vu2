import { Body, Controller, Post } from '@nestjs/common';
import { RegisterRequestDto } from '../dtos';
import { AuthService } from '../services';

@Controller('repair-partner/auth')
export class RepairPartnerController {
  constructor(private readonly _authService: AuthService) {}

  @Post('register')
  async register(@Body() data: RegisterRequestDto) {
    return this._authService.repairPartnerRegister(data);
  }
}

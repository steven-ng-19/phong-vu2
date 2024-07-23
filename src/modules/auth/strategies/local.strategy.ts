import { BadRequestException, Injectable } from '@nestjs/common';

import { AuthService } from '../services';
import { LoginRequestValidator } from '../dtos';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

export const LOCAL_STRATEGY = 'local';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, LOCAL_STRATEGY) {
  constructor(private readonly _authService: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  async validate(email: string, password: string) {
    const validate = LoginRequestValidator.safeParse({ email, password });

    if (validate.error) {
      throw new BadRequestException(
        validate.error.message ?? 'Invalid credentials',
      );
    }

    const user = await this._authService.validateUser(email, password);

    return user;
  }
}

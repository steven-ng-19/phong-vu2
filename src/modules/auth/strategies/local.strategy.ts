import { User } from '@modules/users/models';
import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

import { LoginDto, LoginSchema } from '../dtos';
import { AuthService } from '../services/auth.service';

export const LOCAL_STRATEGY = 'local';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, LOCAL_STRATEGY) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  async validate(
    email: string,
    password: string,
  ): Promise<User | UnauthorizedException> {
    const result = LoginSchema.safeParse({ email, password });
    if (!result.success) {
      throw new HttpException(
        {
          errors: result.error.errors.map((detail) => ({
            message: detail.message,
            path: detail.path[0],
          })),
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const user = await this.authService.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}

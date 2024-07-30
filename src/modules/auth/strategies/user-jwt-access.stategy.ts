import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';

import { AUTH_ERRORS } from 'src/content/errors';
import { CONFIG_VAR } from '@config/config.constant';
import { ConfigService } from '@nestjs/config';
import { JwtClerkPayload } from '../types';
import { PassportStrategy } from '@nestjs/passport';
import { User } from '@modules/users/types';
import { UserRole } from '@common/enums';
import { UserService } from '@modules/users/services';

export const USER_JWT_ACCESS_STRATEGY = 'USER_JWT_ACCESS_STRATEGY';

@Injectable()
export class UserJwtAccessStrategy extends PassportStrategy(
  Strategy,
  USER_JWT_ACCESS_STRATEGY,
) {
  constructor(
    configService: ConfigService,
    private readonly _userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get(CONFIG_VAR.CLERK_JWT_KEY),
    });
  }

  // TODO Fix type
  async validate(payload: JwtClerkPayload): Promise<User> {
    const user = await this._userService.findOne({
      clerkId: payload.userId,
      role: UserRole.USER,
    });

    if (!user) {
      throw new UnauthorizedException(AUTH_ERRORS.INVALID_TOKEN);
    }

    return user;
  }
}

import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';

import { AUTH_ERRORS } from 'src/content/errors';
import { CONFIG_VAR } from '@config/config.constant';
import { ConfigService } from '@nestjs/config';
import { JwtVerifyPayload } from '../types';
import { PassportStrategy } from '@nestjs/passport';
import { UserRole } from '@common/enums';
import { UserService } from '@modules/users/services';

export const ADMIN_JWT_ACCESS_STRATEGY = 'ADMIN_JWT_ACCESS_STRATEGY';

@Injectable()
export class AdminJwtAccessStrategy extends PassportStrategy(
  Strategy,
  ADMIN_JWT_ACCESS_STRATEGY,
) {
  constructor(
    configService: ConfigService,
    private readonly _userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get(CONFIG_VAR.ADMIN_JWT_SECRET),
    });
  }

  async validate(payload: JwtVerifyPayload) {
    const admin = await this._userService.findOne({
      id: payload.id,
      role: UserRole.ADMIN,
    });

    if (!admin) {
      throw new UnauthorizedException(AUTH_ERRORS.INVALID_TOKEN);
    }

    return payload;
  }
}

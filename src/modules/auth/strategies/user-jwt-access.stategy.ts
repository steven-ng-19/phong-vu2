import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';

import { AUTH_ERRORS } from 'src/content/errors';
import { CONFIG_VAR } from '@config/config.constant';
import { ConfigService } from '@nestjs/config';
import { JwtVerifyPayload } from '../types';
import { PassportStrategy } from '@nestjs/passport';
import { UserRole } from '@common/enums';
import { UserService } from '@modules/users/services';

export const USER_JWT_ACCESS_STRATEGY = 'USER_JWT_ACCESS_STRATEGY';

const jwtPublicKey = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAr0u9oMVzh89695Im9E30
eY4Lj9rw8+jaWCPp/psfXmb0Pbw0kNdM33oDto1NGIxl/BgolNcHhmJJlTTh8cr3
Kc8YeK6Un9aaIMtVUmqlJqCDeDkmYe1NrnuYvKVtyN0/HVUXVQY4SvhHUy8mRriK
j1J7x9JxhoeNJX3TO5vo0UaMQE81jJo2v8FkNMoQ4kARqxRdX8Iu3OTzOUp4BAYN
3hfrjylYWTlf9Ol274WRPboqVLEeyTXMlJRmcw2AlmylwtCYJcD/WrzFPVM5MLRy
5z+F1D8Ki2Y/F4Ud9P+Lm693i02CdEoDAG+E3o98EgEqpT+++2a+j9F0v0/eWigS
2wIDAQAB
-----END PUBLIC KEY-----
`;

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

  async validate(payload: JwtVerifyPayload) {
    console.log('payload', payload);

    const user = await this._userService.findOne({
      id: payload.id,
      role: UserRole.USER,
    });

    if (!user) {
      throw new UnauthorizedException(AUTH_ERRORS.INVALID_TOKEN);
    }

    return payload;
  }
}

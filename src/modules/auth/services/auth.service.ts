import * as bcrypt from 'bcryptjs';

import {
  ADMIN_ACCESS_TOKEN,
  ADMIN_REFRESH_TOKEN,
  FORGOT_TOKEN,
  USER_ACCESS_TOKEN,
  USER_REFRESH_TOKEN,
} from '../constants';
import { AUTH_ERRORS, TOKEN_ERRORS } from 'src/content/errors';
import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { SignOptions, sign, verify } from 'jsonwebtoken';

import { CONFIG_VAR } from '@config/config.constant';
import { ConfigService } from '@nestjs/config';
import { RegisterRequestDto } from '../dtos';
import { UserService } from '@modules/users/services';

export type TokenType =
  | typeof USER_ACCESS_TOKEN
  | typeof USER_REFRESH_TOKEN
  | typeof ADMIN_ACCESS_TOKEN
  | typeof ADMIN_REFRESH_TOKEN
  | typeof FORGOT_TOKEN;

@Injectable()
export class AuthService {
  private readonly _jwtKeys: {
    [USER_ACCESS_TOKEN]: string;
    [USER_REFRESH_TOKEN]: string;
    [ADMIN_ACCESS_TOKEN]: string;
    [ADMIN_REFRESH_TOKEN]: string;
    [FORGOT_TOKEN]: string;
  };

  private readonly _jwtOptions: {
    [USER_ACCESS_TOKEN]: SignOptions;
    [USER_REFRESH_TOKEN]: SignOptions;
    [ADMIN_ACCESS_TOKEN]: SignOptions;
    [ADMIN_REFRESH_TOKEN]: SignOptions;
    [FORGOT_TOKEN]: SignOptions;
  };

  constructor(
    private readonly _userService: UserService,
    private readonly _configService: ConfigService,
  ) {
    this._jwtKeys = {
      [USER_ACCESS_TOKEN]: this._configService.get(
        CONFIG_VAR.USER_JWT_SECRET,
        'default_secret',
      ),
      [USER_REFRESH_TOKEN]: this._configService.get(
        CONFIG_VAR.USER_JWT_REFRESH_SECRET,
        'default_secret',
      ),
      [ADMIN_ACCESS_TOKEN]: this._configService.get(
        CONFIG_VAR.ADMIN_JWT_SECRET,
        'default_secret',
      ),
      [ADMIN_REFRESH_TOKEN]: this._configService.get(
        CONFIG_VAR.ADMIN_JWT_REFRESH_SECRET,
        'default_secret',
      ),
      [FORGOT_TOKEN]: this._configService.get(
        CONFIG_VAR.FORGOT_JWT_SECRET,
        'default_secret',
      ),
    };

    this._jwtOptions = {
      [USER_ACCESS_TOKEN]: {
        expiresIn: this._configService.get(CONFIG_VAR.JWT_ACCESS_EXPIRES_IN),
      },
      [USER_REFRESH_TOKEN]: {
        expiresIn: this._configService.get(CONFIG_VAR.JWT_REFRESH_EXPIRES_IN),
      },
      [ADMIN_ACCESS_TOKEN]: {
        expiresIn: this._configService.get(CONFIG_VAR.JWT_ACCESS_EXPIRES_IN),
      },
      [ADMIN_REFRESH_TOKEN]: {
        expiresIn: this._configService.get(CONFIG_VAR.JWT_REFRESH_EXPIRES_IN),
      },
      [FORGOT_TOKEN]: {
        expiresIn: this._configService.get(CONFIG_VAR.JWT_FORGOT_EXPIRES_IN),
      },
    };
  }
  async register(data: RegisterRequestDto) {
    // handle findByEmail
    const user = await this._userService.findOneByEmail({ email: data.email });

    if (user) throw new ConflictException(AUTH_ERRORS.EMAIL_ALREADY_EXISTS);

    const newUser = await this._userService.create(data);
  }

  private async _hashPassword(password: string) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }

  private async _comparePasswords(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }

  private _signPayload(payload: any, type: TokenType) {
    return sign(payload, this._jwtKeys[type], this._jwtOptions[type]);
  }

  private async _verifyToken(token: string, type: string) {
    try {
      const decoded = verify(token, this._jwtKeys[type]);
      return decoded;
    } catch (error) {
      throw new UnauthorizedException(TOKEN_ERRORS.INVALID_TOKEN);
    }
  }
}

import * as bcrypt from 'bcryptjs';

import {
  ADMIN_ACCESS_TOKEN,
  ADMIN_REFRESH_TOKEN,
  EMAIL_TOKEN,
  FORGOT_TOKEN,
  USER_ACCESS_TOKEN,
  USER_REFRESH_TOKEN,
} from '../constants';
import { AUTH_ERRORS, TOKEN_ERRORS } from 'src/content/errors';
import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import {
  ForgotPasswordDto,
  RefreshTokenDto,
  RegisterRequestDto,
  ResetPasswordDto,
} from '../dtos';
import { JwtPayload, SignOptions, sign, verify } from 'jsonwebtoken';
import { JwtVerifyPayload, TokenPayload, TokenType } from '../types';
import { User, UserCreateParams } from '@modules/users/types/user.type';

import { CONFIG_VAR } from '@config/config.constant';
import { ConfigService } from '@nestjs/config';
import { UserRole } from '@common/enums';
import { UserService } from '@modules/users/services';

@Injectable()
export class AuthService {
  private readonly _jwtKeys: {
    [USER_ACCESS_TOKEN]: string;
    [USER_REFRESH_TOKEN]: string;
    [ADMIN_ACCESS_TOKEN]: string;
    [ADMIN_REFRESH_TOKEN]: string;
    [FORGOT_TOKEN]: string;
    [EMAIL_TOKEN]: string;
  };

  private readonly _jwtOptions: {
    [USER_ACCESS_TOKEN]: SignOptions;
    [USER_REFRESH_TOKEN]: SignOptions;
    [ADMIN_ACCESS_TOKEN]: SignOptions;
    [ADMIN_REFRESH_TOKEN]: SignOptions;
    [FORGOT_TOKEN]: SignOptions;
    [EMAIL_TOKEN]: SignOptions;
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
      [EMAIL_TOKEN]: this._configService.get(
        CONFIG_VAR.EMAIL_JWT_SECRET,
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
      [EMAIL_TOKEN]: {
        expiresIn: this._configService.get(CONFIG_VAR.JWT_EMAIL_EXPIRES_IN),
      },
    };
  }

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this._userService.findOneByEmail({ email });

    if (!user) {
      throw new BadRequestException(AUTH_ERRORS.INVALID_CREDENTIAL);
    }

    const isPasswordValid = await this._comparePasswords(
      password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new BadRequestException(AUTH_ERRORS.INVALID_CREDENTIAL);
    }

    return user;
  }

  async register(data: RegisterRequestDto): Promise<{ success: boolean }> {
    const user = await this._userService.findOneByEmail({ email: data.email });

    if (user) throw new ConflictException(AUTH_ERRORS.EMAIL_ALREADY_EXISTS);

    const hashedPassword = await this._hashPassword(data.password);

    const params: UserCreateParams = {
      ...data,
      password: hashedPassword,
      role: UserRole.USER,
    };

    await this._userService.create(params);

    // TODO : send mail verification
    return {
      success: true,
    };
  }

  userLogin(user: User): {
    accessToken: string;
    refreshToken: string;
  } {
    const payload: TokenPayload = {
      id: user.id,
    };

    const { accessToken, refreshToken } = this._signPairsAccessAndRefresh({
      payloadAccess: payload,
      payloadRefresh: payload,
      accessType: USER_ACCESS_TOKEN,
      refreshType: USER_REFRESH_TOKEN,
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  adminLogin(user: User): {
    accessToken: string;
    refreshToken: string;
  } {
    const payload: TokenPayload = {
      id: user.id,
    };

    const { accessToken, refreshToken } = this._signPairsAccessAndRefresh({
      payloadAccess: payload,
      payloadRefresh: payload,
      accessType: ADMIN_ACCESS_TOKEN,
      refreshType: ADMIN_REFRESH_TOKEN,
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  async userRefreshToken(
    data: RefreshTokenDto,
  ): Promise<{ accessToken: string }> {
    const { refreshToken } = data;

    const payload = (await this._verifyToken(
      refreshToken,
      USER_REFRESH_TOKEN,
    )) as JwtVerifyPayload;

    const user = await this._userService.findOneById({ id: payload.id });

    if (!user) {
      throw new UnauthorizedException(AUTH_ERRORS.INVALID_TOKEN);
    }

    const accessToken = this._signPayload(
      { id: payload.id },
      USER_ACCESS_TOKEN,
    );

    return {
      accessToken,
    };
  }

  async adminRefreshToken(
    refreshToken: string,
  ): Promise<{ accessToken: string }> {
    const payload = (await this._verifyToken(
      refreshToken,
      ADMIN_REFRESH_TOKEN,
    )) as JwtVerifyPayload;

    const user = await this._userService.findOneById({ id: payload.id });

    if (!user) {
      throw new UnauthorizedException(AUTH_ERRORS.INVALID_TOKEN);
    }

    const accessToken = this._signPayload(
      { id: payload.id },
      ADMIN_ACCESS_TOKEN,
    );

    return {
      accessToken,
    };
  }

  async forgotPassword(data: ForgotPasswordDto): Promise<{
    resetPasswordToken: string;
  }> {
    const { email } = data;

    // check user
    const user = await this._userService.findOneByEmail({ email });

    if (!user) {
      throw new NotFoundException(AUTH_ERRORS.NOT_FOUND);
    }

    // create token
    const resetPasswordToken = this._signPayload({ id: user.id }, FORGOT_TOKEN);

    await this._userService.update(
      { id: user.id },
      {
        resetPasswordToken,
      },
    );

    return {
      resetPasswordToken,
    };
  }

  async resetPassword(data: ResetPasswordDto): Promise<{ success: boolean }> {
    const { password, resetPasswordToken } = data;

    const user = await this._userService.findOne({ resetPasswordToken });

    if (!user) throw new UnauthorizedException(AUTH_ERRORS.INVALID_TOKEN);

    const hashedPassword = await this._hashPassword(password);

    await this._userService.update(
      { id: user.id },
      {
        password: hashedPassword,
        resetPasswordToken: null,
      },
    );

    return {
      success: true,
    };
  }

  private async _hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }

  private async _comparePasswords(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }

  private _signPayload(payload: TokenPayload, type: TokenType): string {
    return sign(payload, this._jwtKeys[type], this._jwtOptions[type]);
  }

  private _signPairsAccessAndRefresh({
    payloadAccess,
    payloadRefresh,
    accessType,
    refreshType,
  }: {
    payloadAccess: TokenPayload;
    payloadRefresh: TokenPayload;
    accessType: TokenType;
    refreshType: TokenType;
  }): {
    accessToken: string;
    refreshToken: string;
  } {
    return {
      accessToken: this._signPayload(payloadAccess, accessType),
      refreshToken: this._signPayload(payloadRefresh, refreshType),
    };
  }

  private async _verifyToken(
    token: string,
    type: string,
  ): Promise<JwtVerifyPayload | string> {
    try {
      const decoded = verify(token, this._jwtKeys[type]);
      return decoded as JwtVerifyPayload;
    } catch (error) {
      throw new UnauthorizedException(TOKEN_ERRORS.INVALID_TOKEN);
    }
  }
}

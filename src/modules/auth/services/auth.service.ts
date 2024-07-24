import { AUTH_ERRORS, TOKEN_ERRORS } from 'src/content/errors';
import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Gender, UserRole } from '@common/enums';
import { LoginDto, RegisterRequestDto } from '../dtos';

import { AuthQueueService } from './auth-queue.service';
import { CONFIG_VAR } from '@config/config.constant';
import { ClerkService } from '@shared/clerk/clerk.service';
import { ConfigService } from '@nestjs/config';
import { JwtClerkPayload } from '../types/jwt-payload.type';
import { UserCreateParams } from '@modules/users/types/user.type';
import { UserKeys } from '@modules/users/entities';
import { UserService } from '@modules/users/services';
import { verify } from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(
    private readonly _userService: UserService,
    private readonly _configService: ConfigService,
    private readonly _clerkService: ClerkService,
    private readonly _authQueueService: AuthQueueService,
  ) {}

  async register(data: RegisterRequestDto): Promise<{ success: boolean }> {
    const payload = await this._verifyToken(
      data.token,
      this._configService.getOrThrow(CONFIG_VAR.CLERK_JWT_KEY),
    );

    const user = await this._userService.findOneByClerkId({
      clerkId: payload.userId,
    });

    // check usr exist
    if (user) {
      throw new ConflictException(AUTH_ERRORS.EMAIL_ALREADY_EXISTS);
    }

    const params: UserCreateParams = {
      clerkId: payload.userId,
      email: payload.email,
      firstName: payload.firstName ?? 'Unknown',
      gender: Gender.MALE,
      phone: payload.phone ?? 'Unknown',
      userName: payload.userName ?? 'Unknown',
      role: UserRole.USER,
    };

    // create account in system
    await this._userService.create(params);
    return {
      success: true,
    };
  }

  async userLogin(data: LoginDto) {
    const payload = await this._verifyToken(
      data.token,
      this._configService.getOrThrow(CONFIG_VAR.CLERK_JWT_KEY),
    );

    const user = await this._userService.findOneByClerkId({
      clerkId: payload.userId,
    });

    if (!user || user[UserKeys.role] !== UserRole.USER) {
      throw new UnauthorizedException(AUTH_ERRORS.INVALID_TOKEN);
    }

    return {
      success: true,
    };
  }

  async adminLogin(data: LoginDto) {
    const payload = await this._verifyToken(
      data.token,
      this._configService.getOrThrow(CONFIG_VAR.CLERK_JWT_KEY),
    );

    const user = await this._userService.findOneByClerkId({
      clerkId: payload.userId,
    });

    if (!user || user[UserKeys.role] !== UserRole.ADMIN) {
      throw new UnauthorizedException(AUTH_ERRORS.INVALID_TOKEN);
    }

    return {
      success: true,
    };
  }

  async getMe(clerkId: string) {
    const user = await this._userService.findOneByClerkId({ clerkId });

    if (!user) {
    }

    return user;
  }

  private async _verifyToken(
    token: string,
    secret: string,
  ): Promise<JwtClerkPayload> {
    try {
      const decoded = verify(token, secret);
      return decoded as JwtClerkPayload;
    } catch (error) {
      throw new UnauthorizedException(TOKEN_ERRORS.INVALID_TOKEN);
    }
  }
}

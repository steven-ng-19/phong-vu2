import {
  JWT_EXPIRES_IN,
  JWT_REFRESH_EXPIRES_IN,
  JWT_REFRESH_SECRET,
  JWT_SECRET,
} from '@common/constants';
import { base64Hash } from '@common/utils';
import { User } from '@modules/users/models';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { v4 as uuidV4 } from 'uuid';

import { UsersService } from '../../users/services/users.service';
import { ForgotPasswordDto, RegisterDto, ResetPasswordDto } from '../dtos';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<User | null> {
    const user = await this.usersService.findUser(username);
    if (user && (await bcrypt.compare(password, user.hashPassword))) {
      return user;
    }

    return null;
  }

  async register(data: RegisterDto) {
    const { email } = data;

    // Check if user with the same email or phone exists
    const existUser = await this.usersService.findUser(email);
    if (existUser) throw new Error('User already exists');

    // Create user
    await this.usersService.createUser(data);

    // TODO: Send verification email
  }

  async login(user: User) {
    const {
      _id: userId,
      username,
      email,
      phone,
      firstName,
      lastName,
      role,
      status,
    } = user;
    const payload = {
      username,
      userId,
      email,
      phone,
      firstName,
      lastName,
      role,
      status,
    };
    return {
      accessToken: this.jwtService.sign(payload, {
        secret: this.configService.get<string>(JWT_SECRET),
        expiresIn: this.configService.get<string>(JWT_EXPIRES_IN),
      }),
      refreshToken: this.jwtService.sign(
        { userId },
        {
          secret: this.configService.get<string>(JWT_REFRESH_SECRET),
          expiresIn: this.configService.get<string>(JWT_REFRESH_EXPIRES_IN),
        },
      ),
    };
  }

  async refreshToken(refreshToken: string) {
    const payload = this.jwtService.verify(refreshToken, {
      secret: this.configService.get<string>(JWT_REFRESH_SECRET),
    });

    const { userId } = payload;
    const user = await this.usersService.findOne({ _id: userId });
    if (!user) throw new Error('Invalid token');

    return this.login(user);
  }

  async forgotPassword(data: ForgotPasswordDto) {
    const { email } = data;

    // Check if user with the same email or phone exists
    const existUser = await this.usersService.findUser(email);
    if (!existUser) throw new Error('User does not exist');

    const { _id: userId } = existUser;

    // Create reset password token
    const resetPasswordToken = base64Hash(uuidV4());
    await this.usersService.updateUser(userId, {
      resetPasswordToken,
    });

    // TODO: Send reset password email

    return { resetPasswordToken }; // For test only
  }

  async resetPassword(data: ResetPasswordDto) {
    const { token, newPassword: password } = data;
    // Check if reset password token exists
    const user = await this.usersService.findOne({
      resetPasswordToken: token,
    });
    if (!user) throw new Error('Invalid token');

    // Update user password
    const { _id: userId } = user;
    const hashPassword = bcrypt.hashSync(password, 10);
    await this.usersService.updateUser(userId, {
      hashPassword,
      resetPasswordToken: null,
    });
  }
}

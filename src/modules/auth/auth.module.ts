import { JWT_EXPIRES_IN, JWT_SECRET } from '@common/constants';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { UsersModule } from '../users/users.module';
import { AdminAuthController } from './controllers';
import { AuthController } from './controllers';
import { AuthService } from './services';
import { JwtStrategy, LocalStrategy } from './strategies';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>(JWT_SECRET),
        signOptions: {
          expiresIn: configService.get<string>(JWT_EXPIRES_IN),
        },
      }),
    }),
  ],
  controllers: [AuthController, AdminAuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}

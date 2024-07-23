import {
  AdminJwtAccessStrategy,
  LocalStrategy,
  UserJwtAccessStrategy,
} from './strategies';

import { AuthService } from './services';
import { Module } from '@nestjs/common';
import { UserAuthController } from './controllers';
import { UserModule } from '@modules/users/user.module';

@Module({
  imports: [UserModule],
  controllers: [UserAuthController],
  providers: [
    AuthService,
    LocalStrategy,
    AdminJwtAccessStrategy,
    UserJwtAccessStrategy,
  ],
  exports: [],
})
export class AuthModule {}

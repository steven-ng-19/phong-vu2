import { AdminJwtAccessStrategy, UserJwtAccessStrategy } from './strategies';
import { AuthQueueService, AuthService } from './services';

import { Module } from '@nestjs/common';
import { UserAuthController } from './controllers';
import { UserModule } from '@modules/users/user.module';

@Module({
  imports: [UserModule],
  controllers: [UserAuthController],
  providers: [
    AuthService,
    AdminJwtAccessStrategy,
    UserJwtAccessStrategy,
    AuthQueueService,
  ],
  exports: [AuthQueueService],
})
export class AuthModule {}

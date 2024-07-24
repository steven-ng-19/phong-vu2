import {
  AdminJwtAccessStrategy,
  LocalStrategy,
  UserJwtAccessStrategy,
} from './strategies';

import { AuthQueueService } from './services/auth-queue.service';
import { AuthService } from './services';
import { Module } from '@nestjs/common';
import { UserAuthController } from './controllers';
import { UserModule } from '@modules/users/user.module';

@Module({
  imports: [UserModule],
  controllers: [UserAuthController],
  providers: [
    AuthService,
    AuthQueueService,
    LocalStrategy,
    AdminJwtAccessStrategy,
    UserJwtAccessStrategy,
  ],
  exports: [AuthQueueService],
})
export class AuthModule {}

import { AdminUserController, UserController } from './controllers';
import { UserQueueService, UserService } from './services';

import { Module } from '@nestjs/common';
import { UserMapper } from './mappers';

@Module({
  imports: [],
  controllers: [AdminUserController, UserController],
  providers: [UserService, UserMapper, UserQueueService],
  exports: [UserService, UserQueueService],
})
export class UserModule {}

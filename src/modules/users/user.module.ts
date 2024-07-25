import { UserQueueService, UserService } from './services';

import { AdminUserController } from './controllers';
import { Module } from '@nestjs/common';
import { UserMapper } from './mappers';

@Module({
  imports: [],
  controllers: [AdminUserController],
  providers: [UserService, UserMapper, UserQueueService],
  exports: [UserService, UserQueueService],
})
export class UserModule {}

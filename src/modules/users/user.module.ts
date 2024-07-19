import { AdminUserController } from './controllers';
import { Module } from '@nestjs/common';
import { UserMapper } from './mappers';
import { UserService } from './services';

@Module({
  imports: [],
  controllers: [AdminUserController],
  providers: [UserService, UserMapper],
  exports: [UserService],
})
export class UserModule {}

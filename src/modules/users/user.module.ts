import { AdminUserController } from './controllers';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [AdminUserController],
  providers: [],
  exports: [],
})
export class UserModule {}

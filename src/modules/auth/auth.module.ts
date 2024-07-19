import { AuthService } from './services';
import { Module } from '@nestjs/common';
import { UserAuthController } from './controllers';

@Module({
  imports: [],
  controllers: [UserAuthController],
  providers: [AuthService],
  exports: [],
})
export class AuthModule {}

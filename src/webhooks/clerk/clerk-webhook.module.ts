import { ClerkWebhookController } from './controllers';
import { ClerkWebhookService } from './services';
import { Module } from '@nestjs/common';
import { UserModule } from '@modules/users/user.module';

@Module({
  imports: [UserModule],
  controllers: [ClerkWebhookController],
  providers: [ClerkWebhookService],
  exports: [],
})
export class ClerkWebhookModule {}

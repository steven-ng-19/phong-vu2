import { Global, Module } from '@nestjs/common';

import { SendMailService } from './send-mail.service';

@Global()
@Module({
  imports: [],
  controllers: [],
  providers: [SendMailService],
  exports: [SendMailService],
})
export class SendMailModule {}

import { Global, Module } from '@nestjs/common';

import { SendGridService } from './services';

@Global()
@Module({
  providers: [SendGridService],
  exports: [SendGridService],
})
export class TwilioModule {}

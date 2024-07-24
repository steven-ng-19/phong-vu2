import { Global, Module } from '@nestjs/common';

import { ClerkService } from './clerk.service';

@Global()
@Module({
  imports: [],
  controllers: [],
  providers: [ClerkService],
  exports: [ClerkService],
})
export class ClerkModule {}

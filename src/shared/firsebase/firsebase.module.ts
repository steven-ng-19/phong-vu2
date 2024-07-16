import { Global, Module } from '@nestjs/common';

import { FirsebaseService } from './services';

@Global()
@Module({
  providers: [FirsebaseService],
  exports: [FirsebaseService],
})
export class FirseBaseModule {}

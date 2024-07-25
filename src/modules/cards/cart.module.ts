import { CardController } from './controllers';
import { CardMapper } from './mappers';
import { CardService } from './services';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [CardController],
  providers: [CardService, CardMapper],
  exports: [],
})
export class CartModule {}

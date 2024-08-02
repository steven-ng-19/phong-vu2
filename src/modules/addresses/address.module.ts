import { AddressController } from './controllers';
import { AddressMapper } from './mappers/address.mapper';
import { AddressService } from './services';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [AddressController],
  providers: [AddressService, AddressMapper],
  exports: [AddressService],
})
export class AddressModule {}

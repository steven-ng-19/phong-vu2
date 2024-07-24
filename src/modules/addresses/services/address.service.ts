import { AddressCreateParams } from '../types/address.type';
import { AddressMapper } from '../mappers';
import { CreateAddressDto } from '../dtos';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AddressService {
  constructor(private readonly _addressMapper: AddressMapper) {}

  create(data: AddressCreateParams) {
    const mappedData = this._addressMapper.create(data);
  }
}

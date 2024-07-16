import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes, Types } from 'mongoose';

import { AddressEntity } from '../entities';
import { USER_MODEL } from './user.schema';

export const ADDRESS_MODEL = 'Address';

@Schema({
  timestamps: { createdAt: true, updatedAt: true },
  toJSON: { virtuals: true },
})
export class Address {
  @Prop()
  fullName: string;

  @Prop()
  phone: string;

  @Prop()
  address: string;

  @Prop()
  ward: string;

  @Prop()
  district: string;

  @Prop()
  city: string;

  @Prop()
  country: string;

  @Prop()
  latitude: number;

  @Prop()
  longitude: number;

  @Prop()
  isDefault: boolean;

  @Prop({ type: SchemaTypes.ObjectId, ref: USER_MODEL })
  user: Types.ObjectId;
}

export const AddressSchema = SchemaFactory.createForClass(Address);

AddressSchema.virtual('fullAddress').get(function (this: AddressEntity) {
  return [this.address, this.ward, this.district, this.city, this.country]
    .filter(Boolean)
    .join(', ');
});

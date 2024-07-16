import { Gender, UserRole, UserStatus } from '@common/enums';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Address, AddressSchema } from '.';

export const USER_MODEL = 'User';

@Schema({ timestamps: { createdAt: true, updatedAt: true } })
export class User {
  _id: string;

  @Prop()
  username: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop()
  phone: string;

  @Prop()
  hashPassword: string;

  @Prop({ default: false })
  isEmailVerified: boolean;

  @Prop({ default: false })
  isPhoneVerified: boolean;

  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  avatar: string;

  @Prop()
  cover: string;

  @Prop({ type: String, default: UserRole.USER })
  role: UserRole;

  @Prop()
  dob: Date;

  @Prop({ type: String, default: Gender.OTHER })
  gender: Gender;

  @Prop({ type: String, default: UserStatus.ACTIVE })
  status: UserStatus;

  @Prop()
  emailVerificationToken: string;

  @Prop()
  resetPasswordToken: string;

  @Prop()
  customerId: string;

  @Prop({ type: [AddressSchema] })
  addresses: Address[];

  @Prop({ default: [] })
  registrationTokens: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);

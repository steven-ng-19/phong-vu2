import { Document } from 'mongoose';

import { Address, User } from '../models';

export type AddressEntity = Address & Document;
export type UserEntity = User & Document;

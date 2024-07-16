import { Document } from 'mongoose';

import { Wish } from '../models';

export type WishEntity = Wish & Document;

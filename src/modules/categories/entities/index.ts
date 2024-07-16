import { Document } from 'mongoose';

import { Category } from '../models/category.schema';

export type CategoryEntity = Category & Document;

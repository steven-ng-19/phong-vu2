import { Document } from 'mongoose';

import { Gallery, Product } from '../models';

export type GalleryEntity = Gallery & Document;
export type ProductEntity = Product & Document;

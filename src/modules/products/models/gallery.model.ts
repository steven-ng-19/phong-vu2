import * as Zod from 'zod';

import { GalleryType } from '../enums';

export const GalleryModel = Zod.object({
  id: Zod.string(),
  productId: Zod.string(),
  label: Zod.string(),
  url: Zod.string(),
  type: Zod.string(),
  order: Zod.number(),
  createdAt: Zod.date(),
  updatedAt: Zod.date(),
});

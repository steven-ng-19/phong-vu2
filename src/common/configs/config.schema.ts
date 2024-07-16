import { z } from 'zod';

import { ENVIROMENT } from '../enums';

export const configValidate = z
  .object({
    NODE_ENV: z.nativeEnum(ENVIROMENT).default(ENVIROMENT.DEVELOPMENT),
    PORT: z.coerce.number().default(3000),
  })
  .parse(process.env);

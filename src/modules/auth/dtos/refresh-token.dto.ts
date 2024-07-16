import { createZodDto } from '@anatine/zod-nestjs';
import { BaseSchema } from '@common/dtos';
import { z } from 'zod';

export const RefreshTokenSchema = BaseSchema.extend({
  refreshToken: z
    .string({
      message: 'Refresh token must be a string',
    })
    .min(1, {
      message: 'Refresh token is required',
    }),
});

export class RefreshTokenDto extends createZodDto(RefreshTokenSchema) {}

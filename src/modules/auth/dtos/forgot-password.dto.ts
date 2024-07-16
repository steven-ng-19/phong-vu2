import { createZodDto } from '@anatine/zod-nestjs';
import { BaseSchema } from '@common/dtos';
import { z } from 'zod';

export const ForgotPasswordSchema = BaseSchema.extend({
  email: z
    .string({
      message: 'Email must be a string',
    })
    .email({
      message: 'Email does not format',
    })
    .min(1, {
      message: 'Email is required',
    }),
});

export class ForgotPasswordDto extends createZodDto(ForgotPasswordSchema) {}

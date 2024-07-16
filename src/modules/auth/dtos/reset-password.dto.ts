import { createZodDto } from '@anatine/zod-nestjs';
import { BaseSchema } from '@common/dtos';
import { z } from 'zod';

export const ResetPasswordSchema = BaseSchema.extend({
  token: z
    .string({ message: 'Token must be string' })
    .min(1, { message: 'Token is required' })
    .trim(),
  newPassword: z
    .string({ message: 'New password must be a string' })
    .min(1, { message: 'New password is required' }),
}).required({
  token: true,
  newPassword: true,
});

export class ResetPasswordDto extends createZodDto(ResetPasswordSchema) {}

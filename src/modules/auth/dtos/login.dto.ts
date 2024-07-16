import { createZodDto } from '@anatine/zod-nestjs';
import { BaseSchema } from '@common/dtos';
import { z } from 'zod';

export const passwordSchema = z
  .string()
  .regex(
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/,
    {
      message:
        'The password must contain at least 8 characters, including at least 1 uppercase letter, 1 lowercase letter, 1 digit, and 1 special character.',
    },
  );

export const LoginSchema = BaseSchema.extend({
  email: z
    .string({
      message: 'Email must be a string',
    })
    .email({
      message: 'Email is invalid',
    }),
  password: passwordSchema,
}).required();

export class LoginDto extends createZodDto(LoginSchema) {}

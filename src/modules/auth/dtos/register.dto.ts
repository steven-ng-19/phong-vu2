import { createZodDto } from '@anatine/zod-nestjs';
import { BaseSchema } from '@common/dtos';
import { Gender } from '@common/enums';
import { PhoneNumberUtil } from 'google-libphonenumber';
import { z } from 'zod';

import { passwordSchema } from './login.dto';

export const phoneSchema = z.string().superRefine((value, ctx) => {
  const phoneUtil = PhoneNumberUtil.getInstance();
  const isPhone = phoneUtil.isPossibleNumber(phoneUtil.parse(value));

  if (!isPhone) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Phone is invalid',
      fatal: true,
    });
    return z.NEVER;
  }

  return value;
});

export const RegisterSchema = BaseSchema.extend({
  email: z
    .string({ message: 'Email must be a string' })
    .email({ message: 'Email does not format' })
    .min(1, { message: 'Email is required' }),
  password: passwordSchema,
  phone: phoneSchema,
  firstName: z
    .string({ message: 'first name must be a string' })
    .trim()
    .min(1, { message: 'First name is required' }),
  lastName: z
    .string({ message: 'last name must be a string' })
    .trim()
    .optional()
    .nullable(),
  dob: z.string().datetime(),
  gender: z.nativeEnum(Gender, {
    message: `Gender must be contain one of the most [${Object.values(
      Gender,
    )}]`,
  }),
});

export class RegisterDto extends createZodDto(RegisterSchema) {}

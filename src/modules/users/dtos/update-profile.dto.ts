import { BaseSchema } from '@common/dtos';
import { Gender } from '@common/enums';
import { phoneSchema } from '@modules/auth/dtos';
import { z } from 'zod';

export class UpdateProfileDto {
  phone?: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
  cover?: string;
  dob?: Date;
  gender?: Gender;
}

export const UpdateProfileSchema = BaseSchema.extend({
  phone: phoneSchema.optional(),
  firstName: z.string().trim(),
  lastName: z.string().trim(),
  avatar: z.string().url(),
  cover: z.string().url(),
  dob: z.date(),
  gender: z.nativeEnum(Gender),
});

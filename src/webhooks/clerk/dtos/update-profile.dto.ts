import { UserEntity } from '@modules/users/entities';
import { createZodDto } from '@anatine/zod-nestjs';

export const UpdateProfileSchema = UserEntity.pick({
  avatar: true,
  firstName: true,
  lastName: true,
  phone: true,
});

export class UpdateProfileDto extends createZodDto(
  UpdateProfileSchema.partial(),
) {}

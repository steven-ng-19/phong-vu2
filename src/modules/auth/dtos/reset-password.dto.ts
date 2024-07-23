import * as Zod from 'zod';

import { UserEntity } from '@modules/users/entities';
import { createZodDto } from '@anatine/zod-nestjs';

export const ResetPasswordRequestValidator = UserEntity.pick({
  resetPasswordToken: true,
  password: true,
});

export class ResetPasswordDto extends createZodDto(
  ResetPasswordRequestValidator,
) {}

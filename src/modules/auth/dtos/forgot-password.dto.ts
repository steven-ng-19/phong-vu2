import { UserEntity } from '@modules/users/entities';
import { createZodDto } from '@anatine/zod-nestjs';

export const ForgotPasswordRequestValidator = UserEntity.pick({
  email: true,
});

export class ForgotPasswordDto extends createZodDto(
  ForgotPasswordRequestValidator,
) {}

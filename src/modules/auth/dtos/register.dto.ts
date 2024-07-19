import { UserEntity } from '@modules/users/entities';
import { createZodDto } from '@anatine/zod-nestjs';

export const RegisterRequestValidator = UserEntity.pick({
  email: true,
  password: true,
  phone: true,
  firstName: true,
  lastName: true,
  dob: true,
  gender: true,
});

export class RegisterRequestDto extends createZodDto(
  RegisterRequestValidator,
) {}

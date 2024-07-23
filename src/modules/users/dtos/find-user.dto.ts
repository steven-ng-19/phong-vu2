import { UserEntity } from '../entities';
import { createZodDto } from '@anatine/zod-nestjs';

export const FindUserByEmailValidator = UserEntity.pick({
  email: true,
});

export const FindUserByIdValidator = UserEntity.pick({
  id: true,
});

export class FindUserByEmailDto extends createZodDto(
  FindUserByEmailValidator,
) {}

export class FindUserByIdDto extends createZodDto(FindUserByIdValidator) {}

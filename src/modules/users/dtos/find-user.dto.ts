import { UserEntity } from '../entities';
import { createZodDto } from '@anatine/zod-nestjs';

export const FindUserByEmailValidator = UserEntity.pick({
  email: true,
});

export class FindUserByEmailDto extends createZodDto(
  FindUserByEmailValidator,
) {}

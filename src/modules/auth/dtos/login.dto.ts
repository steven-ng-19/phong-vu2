import * as Zod from 'zod';

import { UserEntity } from '@modules/users/entities';
import { createZodDto } from '@anatine/zod-nestjs';

export const LoginRequestValidator = UserEntity.extend({
  token: Zod.string().trim(),
}).pick({
  token: true,
});

export class LoginDto extends createZodDto(LoginRequestValidator) {}

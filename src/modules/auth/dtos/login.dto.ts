import { UserEntity } from '@modules/users/entities';

export const LoginRequestValidator = UserEntity.pick({
  email: true,
  password: true,
});

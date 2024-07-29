import { UserEntity } from '../entities';
import { createZodDto } from '@anatine/zod-nestjs';

export const UserRequestValidator = UserEntity;

export class UserDto extends createZodDto(UserRequestValidator) {}

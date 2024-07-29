import { CartEntity } from '../entities';
import { createZodDto } from '@anatine/zod-nestjs';

export const CartRequestValidator = CartEntity.extend({});

export class CartDto extends createZodDto(CartRequestValidator) {}

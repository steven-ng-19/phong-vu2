import { OrderEntity } from '../entities';
import { createZodDto } from '@anatine/zod-nestjs';

export const ChangeStatusRequestValidator = OrderEntity.pick({
  status: true,
});

export class ChangeStatusDto extends createZodDto(
  ChangeStatusRequestValidator,
) {}

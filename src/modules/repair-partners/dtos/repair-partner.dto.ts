import { RepairPartnerEntity } from '../entities';
import { UserEntity } from '@modules/users/entities';
import { createZodDto } from '@anatine/zod-nestjs';

export const RepairPartnerValidator = RepairPartnerEntity.extend({
  user: UserEntity,
  repairServices: RepairPartnerEntity.array().optional(),
});

export class RepairPartnerDto extends createZodDto(RepairPartnerValidator) {}

import { RepairPartnerEntity } from '../entities';
import { createZodDto } from '@anatine/zod-nestjs';

export const FindByIdRepairPartnerRequestValidator = RepairPartnerEntity.pick({
  id: true,
});

export class FindByIdRepairPartnerDto extends createZodDto(
  FindByIdRepairPartnerRequestValidator,
) {}

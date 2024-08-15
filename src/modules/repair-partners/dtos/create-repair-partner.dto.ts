import { RepairPartnerEntity } from '../entities';
import { createZodDto } from '@anatine/zod-nestjs';

export const CreateRepairPartnerRequestValidator = RepairPartnerEntity.pick({
  email: true,
  firstName: true,
  lastName: true,
  bussinessType: true,
  companyIndustry: true,
  dob: true,
  userId: true,
  stripeAccountId: true,
});

export class CreateRepairPartnerDto extends createZodDto(
  CreateRepairPartnerRequestValidator,
) {}

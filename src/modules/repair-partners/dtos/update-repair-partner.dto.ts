import { RepairPartnerEntity } from '../entities';
import { createZodDto } from '@anatine/zod-nestjs';

export const UpdateRepairPartnerRequestValidator = RepairPartnerEntity.pick({
  firstName: true,
  lastName: true,
  email: true,
  addressLine1: true,
  addressLine2: true,
  bankAccountId: true,
  bussinessType: true,
  bussinessWebSite: true,
  city: true,
  companyIndustry: true,
  country: true,
  dob: true,
  phoneNumber: true,
  postalCode: true,
  state: true,
});

export class UpdateRepairPartnerDto extends createZodDto(
  UpdateRepairPartnerRequestValidator,
) {}

import { BussinessType, CompanyIndustry } from '../enums';

import { RepairPartnerModel } from '../models';

export const RepairPartnerShape = RepairPartnerModel.shape;
export const RepairPartnerKeys = RepairPartnerModel.keyof().enum;
export const RepairPartnerEntity = RepairPartnerModel.extend({
  [RepairPartnerKeys.id]: RepairPartnerShape.id.trim().uuid().max(36),
  [RepairPartnerKeys.userId]: RepairPartnerShape.userId.trim().uuid().max(36),
  [RepairPartnerKeys.bussinessType]: RepairPartnerShape.bussinessType
    .optional()
    .default(BussinessType.INDIVIDUAL),
  [RepairPartnerKeys.companyIndustry]: RepairPartnerShape.companyIndustry
    .optional()
    .default(CompanyIndustry.CONSULTING_SERVICE),
  [RepairPartnerKeys.bussinessWebSite]: RepairPartnerShape.bussinessWebSite
    .trim()
    .max(200)
    .optional()
    .nullable(),
  [RepairPartnerKeys.firstName]: RepairPartnerShape.firstName
    .trim()
    .min(1)
    .max(100),
  [RepairPartnerKeys.lastName]: RepairPartnerShape.lastName.trim().max(100),
  [RepairPartnerKeys.email]: RepairPartnerShape.email.email().trim().max(100),
  [RepairPartnerKeys.dob]: RepairPartnerShape.dob

    // .optional()
    .nullable(),
  [RepairPartnerKeys.country]: RepairPartnerShape.country
    .trim()
    .max(200)
    .optional()
    .nullable(),
  [RepairPartnerKeys.addressLine1]: RepairPartnerShape.addressLine1
    .trim()
    .max(255)
    .optional()
    .nullable(),
  [RepairPartnerKeys.addressLine2]: RepairPartnerShape.addressLine2
    .trim()
    .max(255)
    .optional()
    .nullable(),
  [RepairPartnerKeys.city]: RepairPartnerShape.city
    .trim()
    .max(255)
    .optional()
    .nullable(),
  [RepairPartnerKeys.state]: RepairPartnerShape.state
    .trim()
    .max(200)
    .optional()
    .nullable(),
  [RepairPartnerKeys.postalCode]: RepairPartnerShape.postalCode
    .trim()
    .max(255)
    .optional()
    .nullable(),
  [RepairPartnerKeys.phoneNumber]: RepairPartnerShape.phoneNumber
    .trim()
    .max(20)
    .optional()
    .nullable(),
  [RepairPartnerKeys.bankAccountId]: RepairPartnerShape.bankAccountId
    .trim()
    .optional()
    .nullable(),
  [RepairPartnerKeys.stripeAccountId]: RepairPartnerShape.stripeAccountId
    .trim()
    .optional()
    .nullable(),
  [RepairPartnerKeys.createdAt]: RepairPartnerShape.createdAt.optional(),
  [RepairPartnerKeys.updatedAt]: RepairPartnerShape.updatedAt.optional(),
  [RepairPartnerKeys.deletedAt]: RepairPartnerShape.deletedAt
    .optional()
    .nullable(),
});

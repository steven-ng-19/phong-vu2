import * as Zod from 'zod';

import { EntityNotInFilter, OptionalNullableFields } from '@common/types';

import { CREATE_PARAMS_WITHOUT_FIELDS } from '@common/constants';
import { RepairPartnerDto } from '../dtos';

export type RepairPartner = RepairPartnerDto;

const RepairPartnerUniqueKeyParams = Zod.union([
  Zod.object({
    id: Zod.string(),
  }),
  Zod.object({
    bankAccountId: Zod.string(),
  }),
  Zod.object({
    stripeAccountId: Zod.string(),
  }),
]);

export type RepairPartnerFindByKeyParams = Zod.infer<
  typeof RepairPartnerUniqueKeyParams
> & {
  excludes?: EntityNotInFilter<RepairPartner>;
};

export type RepairPartnerCreateParams = OptionalNullableFields<
  Omit<
    RepairPartner,
    (typeof CREATE_PARAMS_WITHOUT_FIELDS)[number] | 'user' | 'repairServices'
  >
>;

export type RepairPartnerUpdateParams = Partial<
  Omit<RepairPartner, (typeof CREATE_PARAMS_WITHOUT_FIELDS)[number]>
>;

export type RepairPartnerPrimaryKey = Pick<RepairPartner, 'id'>;

export type RepairPartnerFindByCondition = Partial<RepairPartner> & {
  excludes?: EntityNotInFilter<RepairPartner>;
};

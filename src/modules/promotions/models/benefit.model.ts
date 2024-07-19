import * as Zod from 'zod';

export const BenefitModel = Zod.object({
  id: Zod.string(),
  discountId: Zod.string(),
});

import { Document } from 'mongoose';

import { Benifit, Condition, Discount, Gift, Promotion } from '../models';

export type DiscountEntity = Discount & Document;
export type GiftEntity = Gift & Document;
export type BenifitEntity = Benifit & Document;
export type ConditionEntity = Condition & Document;
export type PromotionEntity = Promotion & Document;

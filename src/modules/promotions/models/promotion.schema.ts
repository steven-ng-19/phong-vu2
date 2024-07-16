import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Benifit, BenifitSchema, Condition, ConditionSchema } from '.';

export const PROMOTION_MODEL = 'Promotion';

@Schema({ timestamps: { createdAt: true, updatedAt: true } })
export class Promotion {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  image: string;

  @Prop()
  endDate: Date;

  @Prop({ default: false })
  isDefault: boolean;

  @Prop({ type: ConditionSchema })
  condition: Condition;

  @Prop({ type: BenifitSchema })
  benefit: Benifit;

  @Prop()
  applyOn: string;
}

export const PromotionSchema = SchemaFactory.createForClass(Promotion);

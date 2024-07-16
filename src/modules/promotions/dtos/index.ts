export class DiscountDto {
  percent: number;
  maxAmount: number;
  flat: number;
  maxAmountPerOrder: number;
}

export class GiftDto {
  sku: string;
  name: string;
  image: string;
  quantity: number;
  maxQuantityPerOrder: number;
}

export class BenifitDto {
  discount: DiscountDto;
  gifts: GiftDto[];
}

export class ConditionDto {
  orderValueMin: number;
  orderValueMax: number;
  minQuantity: number;
}

export * from './create-promotion.dto';

import { CreateOrderDto } from '@modules/orders/dtos';

export type CreatePaymentDto = CreateOrderDto & {
  userId: string;
  customerId: string | null | undefined;
  firstName: string;
  lastName: string | null | undefined;
  email: string;
  phone: string;
};

import { OrderStatus } from '@common/enums';

export const allowedTransitionsAdmin = {
  [OrderStatus.PENDING]: [
    OrderStatus.PAID,
    OrderStatus.AWAITING_SHIPMENT,
    OrderStatus.CANCELLED,
  ],
  [OrderStatus.PAID]: [OrderStatus.AWAITING_SHIPMENT, OrderStatus.CANCELLED],
  [OrderStatus.AWAITING_SHIPMENT]: [OrderStatus.SHIPPED, OrderStatus.CANCELLED],
  [OrderStatus.SHIPPED]: [OrderStatus.COMPLETED],
  [OrderStatus.COMPLETED]: [], // Không cho phép chuyển trạng thái thêm
  [OrderStatus.CANCELLED]: [], // Không cho phép chuyển trạng thái thêm
} as const;

export const allowedTransitionUser = {
  [OrderStatus.PENDING]: [OrderStatus.CANCELLED],
  [OrderStatus.PAID]: [],
  [OrderStatus.AWAITING_SHIPMENT]: [],
  [OrderStatus.SHIPPED]: [],
  [OrderStatus.COMPLETED]: [],
  [OrderStatus.CANCELLED]: [],
} as const;

import { Document } from 'mongoose';

import { Order, OrderItem } from '../models';

export type OrderItemEntity = OrderItem & Document;
export type OrderEntity = Order & Document;

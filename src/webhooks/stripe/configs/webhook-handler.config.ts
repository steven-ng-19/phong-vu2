import { OrderService } from '@modules/orders/services';
import { OrderStatus } from '@common/enums';
import Stripe from 'stripe';

export const webHookHandlers = {
  'checkout.session.completed': (
    data: Stripe.CheckoutSessionAsyncPaymentSucceededEvent,
    orderService: OrderService,
  ) => {
    console.log('Checkout completed successfully', data);
  },

  'payment_intent.succeeded': async (
    data: Stripe.PaymentIntentSucceededEvent,
    orderService: OrderService,
  ) => {
    const orderId = data.data.object.metadata['orderId'];
    await orderService.update(
      {
        id: orderId,
      },
      {
        status: OrderStatus.PAID,
        paymentId: data.data.object.id,
      },
    );
  },
  'payment_intent.payment_failed': (
    data: Stripe.PaymentIntentPaymentFailedEvent,
    orderService: OrderService,
  ) => {
    console.log('Payment Failed', data);
  },

  'payment_intent.created': (
    data: Stripe.PaymentIntentCreatedEvent,
    orderService: OrderService,
  ) => {
    console.log('Payment created', data);

    return 200;
  },
};

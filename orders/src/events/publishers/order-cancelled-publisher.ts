import { Publisher, OrderCancelledEvent, Subjects } from '@jfftickets/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  readonly subject = Subjects.OrderCancelled;
}

import { Publisher, OrderCreatedEvent, Subjects } from '@jfftickets/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated;
}

import { Publisher, Subjects, TicketUpdatedEvent } from '@jfftickets/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}

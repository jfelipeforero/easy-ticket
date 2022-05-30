import { Publisher, Subjects, TicketCreatedEvent } from '@jfftickets/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TickedCreated;
}

import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../../app';
import { Order, OrderAttrs, OrderStatus } from '../../models/order';
import { Ticket, TicketAttrs } from '../../models/ticket';
import { natsWrapper } from '../../nats-wrapper';

it('Returns an error if the ticket does not exist', async () => {
  const ticketId = new mongoose.Types.ObjectId();
  await request(app)
    .post('/api/orders')
    .set('Cookie', global.signin())
    .send({
      ticketId,
    })
    .expect(404);
});
it('Returns an error if the ticket is already reserved', async () => {
  const ticket = await Ticket.build({
    title: 'concert',
    price: 20,
  });
  const order = new Order<OrderAttrs>({
    ticket,
    userId: 'asdasasdasd',
    status: OrderStatus.Created,
    expiresAt: new Date(),
  });
  await order.save();
  await request(app)
    .post('/api/orders')
    .set('Cookie', global.signin())
    .send({ ticketId: ticket.id })
    .expect(400);
});
it('It reserves a ticket', async () => {
  const ticket = await Ticket.build({
    title: 'concert',
    price: 20,
  });

  await request(app)
    .post('/api/orders')
    .set('Cookie', global.signin())
    .send({ ticketId: ticket.id })
    .expect(201);
});

it('emits an order created event', async () => {
  const ticket = await Ticket.build({
    title: 'concert',
    price: 20,
  });

  await request(app)
    .post('/api/orders')
    .set('Cookie', global.signin())
    .send({ ticketId: ticket.id })
    .expect(201);

  expect(natsWrapper.client.publish).toHaveBeenCalled();
});

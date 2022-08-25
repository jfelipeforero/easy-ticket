import { Schema, model, Model, HydratedDocument } from 'mongoose';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';
import { Order, OrderStatus } from './order';

export interface TicketAttrs {
  id?: string;
  title: string;
  price: number;
  version?: number;
}

interface TicketMethods {
  isReserved(): Promise<boolean>;
}

interface TicketModel extends Model<TicketAttrs, {}, TicketMethods> {
  build(
    attrs: TicketAttrs
  ): Promise<HydratedDocument<TicketAttrs, TicketMethods>>;
  findByEvent(event: {
    id: string;
    version: number;
  }): Promise<HydratedDocument<TicketAttrs, TicketMethods | null>>;
}

const ticketSchema = new Schema<TicketAttrs, TicketModel, TicketMethods>(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

ticketSchema.set('versionKey', 'version');
ticketSchema.plugin(updateIfCurrentPlugin);

ticketSchema.static('build', function build(attrs: TicketAttrs) {
  const { id, ...rest } = attrs;
  return Ticket.create({
    _id: id,
    ...rest,
  });
});

ticketSchema.static(
  'findByEvent',
  function findByEvent(event: { id: string; version: number }) {
    return Ticket.findOne({
      _id: event.id,
      version: event.version - 1,
    });
  }
);

ticketSchema.methods.isReserved = async function () {
  const existingOrder = await Order.findOne({
    ticket: this,
    status: {
      $in: [
        OrderStatus.Created,
        OrderStatus.AwaitingPayment,
        OrderStatus.Complete,
      ],
    },
  });
  return !!existingOrder;
};

const Ticket = model<TicketAttrs, TicketModel>('Ticket', ticketSchema);

export { Ticket };

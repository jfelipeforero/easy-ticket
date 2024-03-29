import { Schema, model, PopulatedDoc, Document, Types } from 'mongoose';
import { OrderStatus } from '@jfftickets/common';
import { TicketAttrs, Ticket } from './ticket';

export { OrderStatus };

interface OrderAttrs {
  userId: string;
  status: OrderStatus;
  expiresAt: Date;
  ticket: PopulatedDoc<TicketAttrs & Document<Types.ObjectId>>;
}

const orderSchema = new Schema<OrderAttrs>(
  {
    userId: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: Object.values(OrderStatus),
      default: OrderStatus.Created,
    },
    expiresAt: {
      type: Schema.Types.Date,
    },
    ticket: {
      type: Schema.Types.ObjectId,
      ref: 'Ticket',
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

const Order = model<OrderAttrs>('User', orderSchema);

export { Order, OrderAttrs };

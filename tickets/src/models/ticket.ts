import { Schema, model, Model, HydratedDocument } from 'mongoose';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';

interface TicketAttrs {
  title: string;
  price: number;
  userId: string;
  version?: number;
}

interface TicketModel extends Model<TicketAttrs> {
  build(attrs: TicketAttrs): Promise<HydratedDocument<TicketAttrs, {}>>;
}

const ticketSchema = new Schema<TicketAttrs, TicketModel, {}>(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    userId: {
      type: String,
      required: true,
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
  return Ticket.create(attrs);
});

const Ticket = model<TicketAttrs, TicketModel>('Ticket', ticketSchema);

export { Ticket, TicketAttrs };

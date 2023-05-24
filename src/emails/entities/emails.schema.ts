import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type EmailsDocument = HydratedDocument<Emails>;

@Schema()
export class Emails {
  @Prop({ required: true, trim: true })
  sender: string;

  @Prop({ required: true, trim: true })
  receiver: string;

  @Prop({ required: true, trim: true })
  body: string;
}

export const EmailsSchema = SchemaFactory.createForClass(Emails);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema()
export class QuranNote {
  @Prop({ required: true, ref: 'User' })
  uid: string;

  @Prop({ required: true })
  chapter: string;

  @Prop({ unique: true, required: true })
  verse: string;

  @Prop({ required: true })
  content: string;

  @Prop({ required: true })
  tag: string;

  @Prop({ default: Date.now })
  createdAt: Date;
}

SchemaFactory.createForClass(QuranNote);
export const QuranNoteSchema = SchemaFactory.createForClass(QuranNote);
export type QuranNoteDocument = HydratedDocument<QuranNote>;

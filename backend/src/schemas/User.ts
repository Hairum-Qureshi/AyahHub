import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class User {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ unique: true, required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({
    default:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStltpfa69E9JTQOf5ZcyLGR8meBbxMFJxM0w&s',
  })
  profilePicture: string;

  @Prop({ default: Date.now })
  createdAt: Date;
}

SchemaFactory.createForClass(User);
export const UserSchema = SchemaFactory.createForClass(User);
export type UserDocument = User & Document;

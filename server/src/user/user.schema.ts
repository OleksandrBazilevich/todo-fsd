import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, RefType } from 'mongoose';
import { Task } from 'src/task/task.schema';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ unique: true })
  email: string;

  @Prop()
  password: string;

  @Prop({ default: Date.now })
  createdAt?: Date;

  @Prop({ default: Date.now })
  updatedAt?: Date;

  @Prop({ default: [] })
  tasks?: Task[];
}

export const UserSchema = SchemaFactory.createForClass(User);

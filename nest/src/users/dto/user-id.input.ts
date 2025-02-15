import { Field, ID, InputType } from '@nestjs/graphql';
import { IsMongoId, IsNotEmpty } from 'class-validator';
import mongoose from 'mongoose';

@InputType()
export class UserIdInput {
  @IsNotEmpty()
  @IsMongoId()
  @Field(() => ID)
  id: mongoose.Schema.Types.ObjectId;
}

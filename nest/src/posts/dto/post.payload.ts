import { Field, ID, ObjectType } from '@nestjs/graphql';

import { User } from 'src/users/schema/users.schema';
import { UserPayLoadForPost } from './user.payload';

@ObjectType()
export class PostPayLoad {
  @Field(() => ID, { nullable: true })
  _id: string;

  @Field(() => String, { nullable: true })
  title: string;

  @Field(() => String, {nullable: true})
  content: string


  @Field(() => UserPayLoadForPost)
  user: User;
}

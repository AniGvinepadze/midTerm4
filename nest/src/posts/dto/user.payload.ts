import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserPayLoadForPost {
  @Field(() => ID)
  _id: string;

  @Field()
  fullName: string;

  @Field()
  email: string;

  @Field(() => Int)
  age: number;
}

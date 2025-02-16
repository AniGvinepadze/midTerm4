import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { PostPayLoad } from 'src/posts/dto/post.payload';
import { Post } from 'src/posts/schema/post.schema';

@ObjectType()
export class UserPayLoad {
  @Field(() => ID)
  _id: string;

  @Field()
  fullName: string;

  @Field()
  email: string;

  @Field()
  password: string;


  @Field(() => Int)
  age: number;

  @Field(() => [PostPayLoad], { nullable: true })
  posts: Post[];
}

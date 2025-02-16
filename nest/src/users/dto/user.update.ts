import { Field, InputType } from '@nestjs/graphql';
@InputType()
export class UpdateUserInput {
  @Field(() => String, { nullable: true })
  fullName: string;

  @Field(() => String, { nullable: true })
  email: string;

  @Field(() => String, { nullable: true })
  age: number;
}

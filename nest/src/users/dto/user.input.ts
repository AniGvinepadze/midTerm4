import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreateUserInput{

    @Field()
    fullName: string

    @Field()
    email: string

    @Field()
    age: number
}

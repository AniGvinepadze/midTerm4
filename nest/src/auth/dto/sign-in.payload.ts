import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class SignInPayLoad{
    @Field(()=>String,{nullable:true})
    accessToken:string
}
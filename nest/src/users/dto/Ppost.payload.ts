import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class PostPayLoadForUser {
    @Field(()=>String,{nullable:true})
    title:String

    @Field(()=>String,{nullable:true})
    content:String

}

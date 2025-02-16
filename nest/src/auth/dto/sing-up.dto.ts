import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, Length } from 'class-validator';

@InputType()
export class SignUpDto {
  @IsNotEmpty()
  @Field(() => String, { nullable: true })
  fullName: string;

  @IsNotEmpty()
  @IsEmail()
  @Field(() => String, { nullable: true })
  email: string;

  @IsNotEmpty()
  @Length(6, 20)
  @Field(() => String, { nullable: true })
  password: string;
}

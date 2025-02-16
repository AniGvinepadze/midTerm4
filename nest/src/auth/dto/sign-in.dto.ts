import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, Length } from 'class-validator';

@InputType()
export class SignInDto {
  @IsEmail()
  @IsNotEmpty()
  @Field(() => String, { nullable: true })
  email: string;

  @IsNotEmpty()
  @Length(6, 20)
  @Field(() => String, { nullable: true })
  password: string;
}


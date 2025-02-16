import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sing-up.dto';
import { SignInDto } from './dto/sign-in.dto';

import { SignInPayLoad } from './dto/sign-in.payload';
import { UseGuards } from '@nestjs/common';
import { IsAuthGuard } from './isAuth.guard';
import { UserPayLoad } from 'src/users/dto/users,payload';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => String, { nullable: true })
  signUp(@Args('signUpInput') signUp: SignUpDto) {
    return this.authService.signUp(signUp);
  }

  @Mutation(() => SignInPayLoad, { nullable: true })
  signIn(@Args('signInInput') signIn: SignInDto) {
    return this.authService.signIn(signIn);
  }

  @Query(() => UserPayLoad)
  @UseGuards(IsAuthGuard)
  getCurrentUser(@Context('req') req) {
    return this.authService.getCurrentUser(req.userId);
  }
}

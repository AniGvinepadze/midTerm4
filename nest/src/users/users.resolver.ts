import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { UserPayLoad } from './dto/users,payload';
import { UserIdInput } from './dto/user-id.input';
import { CreateUserInput } from './dto/user.input';

@Resolver()
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Query(() => [UserPayLoad], { nullable: true })
  getUsers() {
    return this.usersService.getAllUsers();
  }

  @Query(() => UserPayLoad, { nullable: true })
  getUserById(@Args('id') { id }: UserIdInput) {
    return this.usersService.getUserById(id);
  }

  @Mutation(() => UserPayLoad)
  createUser(@Args('createUserInput') userInput: CreateUserInput) {
 
    return this.usersService.createUser(userInput)
  }
}

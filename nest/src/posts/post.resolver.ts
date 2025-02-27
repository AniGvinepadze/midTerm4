import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PostsService } from './posts.service';
import { PostPayLoad } from './dto/post.payload';
import { UseGuards } from '@nestjs/common';
import { IsAuthGuard } from '../auth/isAuth.guard';
import { PostIdInput } from './dto/post-id.input';
import { CreatePostInput } from './dto/post.input';
import { UpdatePostInput } from './dto/post.update';
import { UsersService } from 'src/users/users.service';

@Resolver()
@UseGuards(IsAuthGuard)
export class PostResolver {
  constructor(
    private postService: PostsService,
    private userService:UsersService

  ) {}

  @Query(() => [PostPayLoad], { nullable: true })
  // @UseGuards(IsAuthGuard)
  getPosts() {
    // console.log(req.userId, 'useriID');
    return this.postService.getAllPosts();
  }

  @Query(() => PostPayLoad, { nullable: true })
  getPostById(@Args('id') { id }: PostIdInput) {
    return this.postService.getPostById(id);
  }

  @Mutation(() => PostPayLoad, { nullable: true })
  createPost(@Context('req') userId,@Args('createPostInput') postInput: CreatePostInput) {
    
    return this.postService.createPost(userId,postInput);
  }

  @Mutation(() => PostPayLoad, { nullable: true })
  updatePost(
    @Args('id') { id }: PostIdInput,
    @Args('updatePostInput') updatePostInput: UpdatePostInput,
  ) {
    return this.postService.updatePost(id, updatePostInput);
  }

  @Mutation(() => PostPayLoad)
  async deletePost(@Args('id') { id }: PostIdInput) {
    return this.postService.deletePost(id);
  }
}

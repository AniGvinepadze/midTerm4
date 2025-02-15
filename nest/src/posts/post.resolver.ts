import { Context, Query, Resolver } from '@nestjs/graphql';
import { PostsService } from './posts.service';
import { PostPayLoad } from './dto/post.payload';

@Resolver()
export class PostResolver {
  constructor(private postService: PostsService) {}

  @Query(() => [PostPayLoad], { nullable: true })
  getPosts() {
    return this.postService.getAllPosts();
  }
}

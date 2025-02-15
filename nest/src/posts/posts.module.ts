import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { postSchema } from './schema/post.schema';
import { PostsService } from './posts.service';
import { userSchema } from 'src/users/schema/users.schema';
import { PostResolver } from './post.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'post', schema: postSchema },
      { name: 'user', schema: userSchema },
    ]),
  ],
  providers: [PostsService, PostResolver],
})
export class PostsModule {}

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { postSchema } from './schema/post.schema';
import { PostsService } from './posts.service';
import { userSchema } from 'src/users/schema/users.schema';
import { PostResolver } from './post.resolver';
import { UsersService } from 'src/users/users.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'post', schema: postSchema },
      // { name: 'user', schema: userSchema },
    ]),
    UsersModule,
  ],
  providers: [PostsService, PostResolver],
})
export class PostsModule {}

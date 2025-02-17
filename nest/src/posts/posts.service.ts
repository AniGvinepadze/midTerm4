import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from './schema/post.schema';

import { UsersService } from 'src/users/users.service';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel('post') private postModel: Model<Post>,
    private userService: UsersService
  ) {}

  async getAllPosts() {
    const posts = await this.postModel.find().populate({ path: 'user' });
    return posts;
  }

  async getPostById(id) {
    const post = await this.postModel.findById(id);
    if (!post) throw new NotFoundException('post was not found');
    return post;
  }

 async createPost(userId,createPostDto) {
    const newPost = await this.postModel.create({...createPostDto,user:userId})
    await this.userService.addPost(newPost._id,userId)
    return newPost
  }

  async updatePost(id, updatePost) {
    const updatedPost = await this.postModel.findByIdAndUpdate(id, updatePost, {
      new: true,
    });
    return updatedPost;
  }

  async deletePost(id) {
    const deletedPost = await this.postModel.findByIdAndDelete(id);
    if (!deletedPost)
      throw new BadRequestException('post could not be deleted');
    return deletedPost;
  }
}

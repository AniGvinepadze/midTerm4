import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from './schema/post.schema';
import { User } from 'src/users/schema/users.schema';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel('post') private postModel: Model<Post>,
    @InjectModel('user') private userModel: Model<User>,
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

  createPost(req,createPostDto) {
    return this.postModel.create(req,createPostDto);
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

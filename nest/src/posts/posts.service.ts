import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from './schema/post.schema';
import { User } from 'src/users/schema/users.schema';

@Injectable()
export class PostsService {
    constructor(
        @InjectModel('post') private postModel: Model<Post>,
        @InjectModel('user') private userModel: Model<User>,
    
    ){}

    async getAllPosts(){
        const posts = await this.postModel.find().populate({path: 'user'})
        return posts
    }
}

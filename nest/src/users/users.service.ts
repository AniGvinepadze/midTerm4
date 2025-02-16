import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schema/users.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel('user') private userModel: Model<User>) {}

  getAllUsers() {
    return this.userModel.find().populate('posts');
  }

  async getUserById(id) {
    const user = await this.userModel.findById(id);
    if (!user) throw new NotFoundException('not found');
    return user;
  }
  createUser(createUserDto) {
    return this.userModel.create(createUserDto);
  }

  async updateUser(id, updateUser) {
    const updatedUser = await this.userModel.findByIdAndUpdate(id, updateUser, {
      new: true,
    });
    return updatedUser;
  }

  async deleteUser(id) {
    const deletedUser = await this.userModel.findByIdAndDelete(id);
    if (!deletedUser)
      throw new BadRequestException('user could not be deleted');
    return deletedUser;
  }
}

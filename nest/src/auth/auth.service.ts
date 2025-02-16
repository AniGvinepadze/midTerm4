import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/users/schema/users.schema';
import { SignUpDto } from './dto/sing-up.dto';
import * as bcrypt from 'bcrypt';
import { SignInDto } from './dto/sign-in.dto';
@Injectable()
export class AuthService {
  constructor(
    @InjectModel('user') private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async signUp({ email, fullName, password }: SignUpDto) {
    const existUser = await this.userModel.findOne({ email });
    if (existUser) throw new BadRequestException('user already exists');

    const hashedPassword = await bcrypt.hash(password, 10);

    await this.userModel.create({ fullName, email, password: hashedPassword });

    return 'user registered succsessfully';
  }

  async signIn({ email, password }: SignInDto) {
    const existuser = await this.userModel.findOne({ email });
    console.log(existuser, 'existUser');
    if (!existuser)
      throw new BadRequestException('email or password is incorrect');

    const isPassequal = await bcrypt.compare(password, existuser.password);
    if (!isPassequal)
      throw new BadRequestException('email or password is incorrect');

    const payLoad = {
      userId: existuser._id,
    };

    const accessToken = await this.jwtService.sign(payLoad, {
      expiresIn: '1h',
    });

    return {accessToken};
  }

  async getCurrentUser(userId) {
    const user = await this.userModel.findById(userId).select('-password');
    return user;
  }
}

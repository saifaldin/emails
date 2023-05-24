import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Users, UsersDocument } from './entities/users.schema';
import { Model } from 'mongoose';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(Users.name) private usersModel: Model<Users>) {}

  async login(loginDto: LoginDto) {
    try {
      const foundUser: UsersDocument = await this.usersModel
        .findOne({ email: loginDto.email, password: loginDto.password })
        .lean();
      return foundUser && foundUser.email;
    } catch (error) {
      return 'Unexepected Error';
    }
  }
}

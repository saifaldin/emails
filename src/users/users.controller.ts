import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { LoginDto } from './dto/login.dto';
import { Response } from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly UsersService: UsersService) {}

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto, @Res() res: Response) {
    const result = await this.UsersService.login(loginDto);
    if (!result) {
      res.status(HttpStatus.NOT_FOUND).send(result);
      return result;
    }
    res.send(result);
    return result;
  }
}

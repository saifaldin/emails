import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { EmailsService } from './emails.service';
import { ReplyDto } from './dto/reply.dto';
import { Response } from 'express';

@Controller('emails')
export class EmailsController {
  constructor(private readonly EmailsService: EmailsService) {}

  @Post()
  async reply(@Body() replyDto: ReplyDto, @Res() res: Response) {
    const result = await this.EmailsService.reply(replyDto);
    if (result === 'User not found') {
      res.status(HttpStatus.NOT_FOUND).send(result);
      return result;
    }
    res.status(HttpStatus.CREATED).send(result);
    return result;
  }

  @Get()
  inbox() {
    return this.EmailsService.inbox();
  }
}

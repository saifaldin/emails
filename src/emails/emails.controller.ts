import { Body, Controller, Get, Post } from '@nestjs/common';
import { EmailsService } from './emails.service';
import { ReplyDto } from './dto/reply.dto';

@Controller('emails')
export class EmailsController {
  constructor(private readonly EmailsService: EmailsService) {}

  @Post()
  reply(@Body() replyDto: ReplyDto) {
    return this.EmailsService.reply(replyDto);
  }

  @Get()
  inbox() {
    return this.EmailsService.inbox();
  }
}

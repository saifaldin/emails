import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { EmailsService } from './emails.service';
import { ReplyDto } from './dto/reply.dto';
import { Response } from 'express';
import { InboxDto } from './dto/inbox.dto';
import { EmailDetailsDto } from './dto/email-details.dto';

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
  inbox(@Query() inboxDto: InboxDto) {
    return this.EmailsService.inbox(inboxDto);
  }

  @Get('/:_id')
  emailDetails(@Param() emailDetailsDto: EmailDetailsDto) {
    return this.EmailsService.emailDetails(emailDetailsDto);
  }
}

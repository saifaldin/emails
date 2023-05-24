import { HttpStatus, Injectable } from '@nestjs/common';
import * as AWS_SES from '@aws-sdk/client-ses';
import { ConfigService } from '@nestjs/config';
import { ReplyDto } from './dto/reply.dto';
import { UsersService } from 'src/users/users.service';
import { InjectModel } from '@nestjs/mongoose';
import { Emails } from './entities/emails.schema';
import { Model } from 'mongoose';
import { InboxDto } from './dto/inbox.dto';
import { EmailDetailsDto } from './dto/email-details.dto';

@Injectable()
export class EmailsService {
  private readonly sesClient: AWS_SES.SES;

  constructor(
    @InjectModel(Emails.name) private emailsModel: Model<Emails>,
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
  ) {
    const awsConfigs = {
      region: configService.get('aws.region'),
      endpoint: configService.get('aws.endpoint'),
      credentials: {
        accessKeyId: configService.get('aws.id'),
        secretAccessKey: configService.get('aws.secret'),
      },
    };
    this.sesClient = new AWS_SES.SES(awsConfigs);
  }

  async reply(replyDto: ReplyDto) {
    try {
      const { email, password, destination, subject, body } = replyDto;
      const user = await this.usersService.login({ email, password });
      if (!user) {
        return 'User not found';
      }

      const verifiedEmails = await this.sesClient.listVerifiedEmailAddresses({});
      if (!verifiedEmails.VerifiedEmailAddresses.includes(email)) {
        console.log(email);
        await this.sesClient.verifyEmailAddress({ EmailAddress: email });
      }

      const res = await this.sesClient.sendEmail({
        Source: email,
        Destination: {
          ToAddresses: [destination],
        },
        Message: {
          Subject: {
            Data: subject,
          },
          Body: {
            Text: {
              Data: body,
            },
          },
        },
      });
      return res;
    } catch (error) {
      if (error.message.includes('Email address not verified')) {
        return {
          error: HttpStatus.BAD_REQUEST,
          message:
            'Email address not verified. Please verify email on SES first',
        };
      }
    }
  }

  async inbox(inboxDto: InboxDto) {
    try {
      const { email } = inboxDto;
      const emailsList = await this.emailsModel
        .find({ receiver: email }, 'subject')
        .lean();
      return emailsList;
    } catch (error) {
      return error;
    }
  }

  async emailDetails(emailDetailsDto: EmailDetailsDto) {
    try {
      const { _id } = emailDetailsDto;
      const emailsList = await this.emailsModel.findOne({ _id }).lean();
      return emailsList;
    } catch (error) {
      return error;
    }
  }
}

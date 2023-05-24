import { HttpStatus, Injectable } from '@nestjs/common';
import * as AWS_SES from '@aws-sdk/client-ses';
import * as AWS_S3 from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';
import { ReplyDto } from './dto/reply.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class EmailsService {
  private readonly sesClient: AWS_SES.SES;
  private readonly s3Client: AWS_S3.S3;

  constructor(
    private configService: ConfigService,
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
    this.s3Client = new AWS_S3.S3({ ...awsConfigs, forcePathStyle: true });
  }

  async reply(replyDto: ReplyDto) {
    const { email, password, destination, subject, body } = replyDto;
    try {
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

  async inbox() {
    try {
      const res = await this.s3Client.listObjects({
        Bucket: 'email-gmail.com',
      });
      return res;
    } catch (error) {
      return error;
    }
  }
}

import { Injectable } from '@nestjs/common';
import * as AWS_SES from '@aws-sdk/client-ses';
import * as AWS_S3 from '@aws-sdk/client-s3';

@Injectable()
export class EmailsService {
  private readonly sesClient: AWS_SES.SES;
  private readonly s3Client: AWS_S3.S3;
  constructor() {
    this.sesClient = new AWS_SES.SES({
      region: 'us-east-1',
      endpoint: 'http://localhost:4566',
      credentials: {
        accessKeyId: 'key',
        secretAccessKey: 'key',
      },
    });
    this.s3Client = new AWS_S3.S3({
      region: 'us-east-1',
      endpoint: 'http://localhost:4566',
      forcePathStyle: true,
      credentials: {
        accessKeyId: 'key',
        secretAccessKey: 'key',
      },
    });
  }

  async reply(replyDto) {
    const res = await this.sesClient.sendEmail({
      Source: 'email@gmail.com',
      Destination: {
        ToAddresses: ['email-1@gmail.com'],
      },
      Message: {
        Subject: {
          Data: 'SUBJECTTEMAIL',
        },
        Body: {
          Text: {
            Data: 'BODYEMAILBODYYYY',
          },
        },
      },
    });
    return res;
  }

  async inbox() {
    const res = await this.s3Client.putObject({
      Bucket: 'email-gmail.com',
      Key: 'email1',
      
    });
    return res;
  }
}

import { Module } from '@nestjs/common';
import { EmailsController } from './emails/emails.controller';
import { EmailsService } from './emails/emails.service';
import { EmailsModule } from './emails/emails.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    EmailsModule,
    MongooseModule.forRoot('mongodb://localhost/emailer'),
    UsersModule,
  ],
  controllers: [EmailsController],
  providers: [EmailsService],
})
export class AppModule {}

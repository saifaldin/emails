import { Module } from '@nestjs/common';
import { EmailsService } from './emails.service';
import { EmailsController } from './emails.controller';
import { UsersModule } from 'src/users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Emails, EmailsSchema } from './entities/emails.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Emails.name, schema: EmailsSchema }]),
    UsersModule,
  ],
  controllers: [EmailsController],
  providers: [EmailsService],
})
export class EmailsModule {}

import { Module } from '@nestjs/common';
import { EmailsController } from './emails/emails.controller';
import { EmailsService } from './emails/emails.service';
import { EmailsModule } from './emails/emails.module';

@Module({
  imports: [EmailsModule],
  controllers: [EmailsController],
  providers: [EmailsService],
})
export class AppModule {}

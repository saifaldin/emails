import { Module } from '@nestjs/common';
import { EmailsController } from './emails/emails.controller';
import { EmailsService } from './emails/emails.service';
import { EmailsModule } from './emails/emails.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { config } from './config/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
      isGlobal: true,
    }),
    MongooseModule.forRoot(config().database.host),
    EmailsModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

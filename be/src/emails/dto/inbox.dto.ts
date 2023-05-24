import { IsEmail, IsNotEmpty } from 'class-validator';

export class InboxDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;
}

import { IsEmail, IsNotEmpty } from 'class-validator';

export class ReplyDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  @IsEmail()
  destination: string;

  @IsNotEmpty()
  subject: string;

  @IsNotEmpty()
  body: string;
}

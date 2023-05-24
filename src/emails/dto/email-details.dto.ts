import { IsNotEmpty } from 'class-validator';

export class EmailDetailsDto {
  @IsNotEmpty()
  _id: string;
}

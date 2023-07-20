import { IsNotEmpty } from 'class-validator';

export class groupDto {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  image: string;
  @IsNotEmpty()
  type: string;
  password: string
}
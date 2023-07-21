import { IsNotEmpty, IsOptional } from 'class-validator';

export class groupDto {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  type: string;
  @IsOptional()
  password: string
}
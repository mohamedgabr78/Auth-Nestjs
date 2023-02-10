import { isEmail, isNotEmpty, IsString } from 'class-validator';

export class AuthDto {

  email: string;

  @IsString()
  password: string;
}
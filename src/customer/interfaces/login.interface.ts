import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class ILogin {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}

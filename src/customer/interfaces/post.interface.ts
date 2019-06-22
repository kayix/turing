import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class IPostCustomer {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @Length(0, 50)
  readonly password: string;
}

import { IsEmail, IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class IPutCustomer {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @IsOptional()
  @Length(0, 50)
  readonly password: string;

  @IsString()
  @IsOptional()
  readonly day_phone: string;

  @IsString()
  @IsOptional()
  readonly eve_phone: string;

  @IsString()
  @IsOptional()
  readonly mob_phone: string;
}

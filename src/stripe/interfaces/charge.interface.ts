import { IsNotEmpty, IsNumberString, IsOptional, IsString } from 'class-validator';

export class ICharge {
  @IsString()
  @IsNotEmpty()
  stripeToken: string;

  @IsNumberString()
  @IsNotEmpty()
  order_id: number;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumberString()
  @IsNotEmpty()
  amount: number;

  @IsString()
  @IsOptional()
  currency: string;
}

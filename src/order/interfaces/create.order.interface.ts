import { IsNotEmpty, IsNumberString, IsString } from 'class-validator';

export class ICreateOrder {
  @IsString()
  @IsNotEmpty()
  cart_id: string;

  @IsNumberString()
  @IsNotEmpty()
  shipping_id: number;

  @IsNumberString()
  @IsNotEmpty()
  tax_id: number;
}

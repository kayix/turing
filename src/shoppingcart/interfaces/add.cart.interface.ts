import { IsNotEmpty, IsNumberString, IsString } from 'class-validator';

export class IAddCart {
  @IsNumberString()
  @IsNotEmpty()
  product_id: number;

  @IsString()
  @IsNotEmpty()
  cart_id: string;

  @IsString()
  @IsNotEmpty()
  attributes: string;
}

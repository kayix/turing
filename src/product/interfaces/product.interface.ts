import { IsNotEmpty, IsNumberString } from 'class-validator';

export class IProduct {
  @IsNumberString()
  @IsNotEmpty()
  product_id: number;
}

import { IsNotEmpty, IsNumberString } from 'class-validator';

export class IProductDetails {
  @IsNotEmpty()
  @IsNumberString()
  product_id: number;
}

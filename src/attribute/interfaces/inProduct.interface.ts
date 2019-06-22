import { IsNotEmpty, IsNumberString } from 'class-validator';

export class IInProduct {
  @IsNotEmpty()
  @IsNumberString()
  product_id: number;
}

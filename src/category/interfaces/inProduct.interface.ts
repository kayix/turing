import { IsNotEmpty, IsNumberString } from 'class-validator';

export class IInProduct {
  @IsNumberString()
  @IsNotEmpty()
  product_id: number;
}

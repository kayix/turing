import { IsNotEmpty, IsNumberString } from 'class-validator';

export class IProductLocations {
  @IsNotEmpty()
  @IsNumberString()
  product_id: number;
}

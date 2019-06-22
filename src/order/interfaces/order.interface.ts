import { IsNotEmpty, IsNumberString } from 'class-validator';

export class IOrder {
  @IsNotEmpty()
  @IsNumberString()
  order_id: number;
}

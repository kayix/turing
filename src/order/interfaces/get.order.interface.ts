import { IsNotEmpty, IsNumberString } from 'class-validator';

export class IGetOrder {
  @IsNotEmpty()
  @IsNumberString()
  order_id: number;
}

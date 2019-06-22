import { IsNotEmpty, IsString } from 'class-validator';

export class IEmptyCart {
  @IsNotEmpty()
  @IsString()
  cart_id: string
}
import { IsNotEmpty, IsString } from 'class-validator';

export class ITotalCart {
  @IsNotEmpty()
  @IsString()
  cart_id: string;
}

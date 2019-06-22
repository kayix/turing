import { IsNotEmpty, IsString } from 'class-validator';

export class IGetCart {
  @IsNotEmpty()
  @IsString()
  cart_id: string;
}

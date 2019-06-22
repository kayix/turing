import { IsNotEmpty, IsString } from 'class-validator';

export class IGetSavedCart {
  @IsNotEmpty()
  @IsString()
  cart_id: string;
}

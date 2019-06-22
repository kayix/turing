import { IsNotEmpty, IsNumberString } from 'class-validator';

export class IMoveCart {
  @IsNotEmpty()
  @IsNumberString()
  item_id: number;
}

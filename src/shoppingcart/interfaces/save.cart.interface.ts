import { IsNotEmpty, IsNumberString } from 'class-validator';

export class ISaveCart {
  @IsNotEmpty()
  @IsNumberString()
  item_id: number;
}

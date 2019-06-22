import { IsNotEmpty, IsNumberString } from 'class-validator';

export class IRemoveCart {
  @IsNotEmpty()
  @IsNumberString()
  item_id: number;
}

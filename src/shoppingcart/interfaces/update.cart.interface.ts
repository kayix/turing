import { IsNotEmpty, IsNumberString, IsString } from 'class-validator';

export class IUpdateCartParams {
  @IsNotEmpty()
  @IsNumberString()
  item_id: number;
}

export class IUpdateCartBody {
  @IsNotEmpty()
  @IsNumberString()
  quantity: number;
}

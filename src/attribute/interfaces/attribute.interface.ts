import { IsNotEmpty, IsNumberString } from 'class-validator';

export class IAttribute {
  @IsNumberString()
  @IsNotEmpty()
  attribute_id: number;
}

import { IsNotEmpty, IsNumberString } from 'class-validator';

export class IAttributeValues {
  @IsNumberString()
  @IsNotEmpty()
  attribute_id: number;
}

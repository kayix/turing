import { IsNotEmpty, IsNumberString } from 'class-validator';

export class ICategory {
  @IsNumberString()
  @IsNotEmpty()
  category_id: number;
}

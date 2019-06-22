import { IsNotEmpty, IsNumberString } from 'class-validator';
import { IProducts } from './products.interface';

export class IInCategoryParam {
  @IsNumberString()
  @IsNotEmpty()
  category_id: number;
}

export class IInCategoryQuery extends IProducts {}

import { IsNotEmpty, IsNumberString } from 'class-validator';
import { IProducts } from './products.interface';

export class IInDepartmentParams {
  @IsNumberString()
  @IsNotEmpty()
  department_id: number;
}

export class IInDepartmentQuery extends IProducts {}

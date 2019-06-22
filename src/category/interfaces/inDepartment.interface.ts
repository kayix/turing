import { IsNotEmpty, IsNumberString } from 'class-validator';

export class IInDepartment {
  @IsNumberString()
  @IsNotEmpty()
  department_id: number;
}

import { IsNotEmpty, IsNumberString } from 'class-validator';

export class IDepartment {
  @IsNumberString()
  @IsNotEmpty()
  department_id: number;
}

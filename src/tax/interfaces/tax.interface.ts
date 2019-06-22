import { IsNotEmpty, IsNumberString } from 'class-validator';

export class ITax {
  @IsNotEmpty()
  @IsNumberString()
  tax_id: number;
}

import { IsNotEmpty, IsString, Length } from 'class-validator';

export class IUpdateCustomerCreditCard {
  @IsString()
  @IsNotEmpty()
  @Length(12, 12)
  credit_card: string;
}

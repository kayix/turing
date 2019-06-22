import { IsString, IsNotEmpty, IsOptional, IsNumberString } from 'class-validator';

export class IUpdateCustomerAddress {
  @IsString()
  @IsNotEmpty()
  address_1: string;

  @IsString()
  @IsOptional()
  address_2: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  region: string;

  @IsString()
  @IsNotEmpty()
  postal_code: string;

  @IsString()
  @IsNotEmpty()
  country: string;

  @IsNumberString()
  @IsNotEmpty()
  shipping_region_id: string;
}

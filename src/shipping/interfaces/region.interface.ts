import { IsNotEmpty, IsNumberString } from 'class-validator';

export class IRegion {
  @IsNumberString()
  @IsNotEmpty()
  shipping_region_id: number;
}

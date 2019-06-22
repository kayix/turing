import { Controller, Get, Param } from '@nestjs/common';
import { ShippingService } from './shipping.service';
import { ShippingRegion } from './shipping.entity';
import { IRegion } from './interfaces/region.interface';

@Controller('shipping')
export class ShippingController {
  constructor(private readonly shippingService: ShippingService) {}
  @Get('/regions')
  getShippingRegions(): Promise<ShippingRegion[]> {
    return this.shippingService.getShippingRegions();
  }

  @Get('/regions/:shipping_region_id')
  getShippingRate(@Param() params: IRegion): Promise<any> {
    return this.shippingService.getShippingRegion(params.shipping_region_id);
  }
}

import { HttpException, Inject, Injectable } from '@nestjs/common';
import { Shipping } from './shipping.entity';
import { ShippingRegion } from './shipping.entity';
import TYPES from '../constants';

@Injectable()
export class ShippingService {
  constructor(
    @Inject(TYPES.SHIPPING_REPOSITORY)
    private readonly shippingRepository: typeof Shipping,

    @Inject(TYPES.SHIPPING_REGION_REPOSITORY)
    private readonly shippingRegionRepository: typeof ShippingRegion,
  ) {}

  async getShippingRegions(): Promise<ShippingRegion[]> {
    return this.shippingRegionRepository.findAll();
  }

  async getShippingRegion(shippingRegionId: number): Promise<any> {
    const shipping = await this.shippingRepository.findOne({ where: { shipping_region_id: shippingRegionId } });
    if (!shipping) {
      throw new HttpException('Invalid shipping_region_id', 400);
    }
    return shipping;
  }
}

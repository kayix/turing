import { Shipping } from './shipping.entity';
import { ShippingRegion } from './shipping.entity';
import TYPES from '../constants';

export const shippingProviders = [
  {
    provide: TYPES.SHIPPING_REPOSITORY,
    useValue: Shipping,
  },
  {
    provide: TYPES.SHIPPING_REGION_REPOSITORY,
    useValue: ShippingRegion,
  },
];

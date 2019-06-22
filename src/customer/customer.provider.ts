import { Customer } from './customer.entity';
import TYPES from '../constants';

export const customerProviders = [
  {
    provide: TYPES.CUSTOMER_REPOSITORY,
    useValue: Customer,
  },
];

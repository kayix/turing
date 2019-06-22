import { Tax } from './tax.entity';
import TYPES from '../constants';

export const taxProviders = [
  {
    provide: TYPES.TAX_REPOSITORY,
    useValue: Tax,
  },
];

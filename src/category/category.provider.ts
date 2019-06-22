import { Category } from './category.entity';
import TYPES from '../constants';

export const categoryProviders = [
  {
    provide: TYPES.CATEGORY_REPOSITORY,
    useValue: Category,
  },
];

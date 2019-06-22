import { Product } from './product.entity';
import TYPES from '../constants';
import { Category } from '../category/category.entity';
import { Review } from '../review/review.entity';

export const productProviders = [
  {
    provide: TYPES.PRODUCT_REPOSITORY,
    useValue: Product,
  },
  {
    provide: TYPES.CATEGORY_REPOSITORY,
    useValue: Category,
  },
  {
    provide: TYPES.REVIEW_REPOSITORY,
    useValue: Review,
  },
];

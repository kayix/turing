import { Review } from './review.entity';
import TYPES from '../constants';

export const reviewProviders = [
  {
    provide: TYPES.REVIEW_REPOSITORY,
    useValue: Review,
  },
];

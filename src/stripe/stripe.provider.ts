import { Stripe } from './stripe.entity';
import TYPES from '../constants';

export const stripeProviders = [
  {
    provide: TYPES.STRIPE_REPOSITORY,
    useValue: Stripe,
  },
];

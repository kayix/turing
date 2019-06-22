import { ShoppingCart } from './shoppingcart.entity';
import { Product } from '../product/product.entity';
import TYPES from '../constants';

export const shoppingCartProviders = [
  {
    provide: TYPES.SHOPPING_CART,
    useValue: ShoppingCart,
  },
  {
    provide: TYPES.PRODUCT_REPOSITORY,
    useValue: Product,
  },
];

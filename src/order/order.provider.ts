import { Order, OrderDetail } from './order.entity';
import TYPES from '../constants';
import { ShoppingCart } from '../shoppingcart/shoppingcart.entity';

export const orderProviders = [
  {
    provide: TYPES.ORDER_REPOSITORY,
    useValue: Order,
  },
  {
    provide: TYPES.ORDER_DETAIL_REPOSITORY,
    useValue: OrderDetail,
  },
  {
    provide: TYPES.SHOPPING_CART,
    useValue: ShoppingCart,
  },
];

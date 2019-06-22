import { Sequelize } from 'sequelize-typescript';
import { Product, ProductCategory, ProductAttributeValue } from '../product/product.entity';
import { Department } from '../department/department.entity';
import { Category } from '../category/category.entity';
import { Attribute, AttributeValue } from '../attribute/attribute.entity';
import { Review } from '../review/review.entity';
import { Customer } from '../customer/customer.entity';
import { Order } from '../order/order.entity';
import { OrderDetail } from '../order/order.entity';
import { ShoppingCart } from '../shoppingcart/shoppingcart.entity';
import { Tax } from '../tax/tax.entity';
import { Shipping } from '../shipping/shipping.entity';
import { ShippingRegion } from '../shipping/shipping.entity';
import { Stripe } from '../stripe/stripe.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        operatorsAliases: false,
        dialect: 'mysql',
        host: 'mysql-dev',
        port: 3306,
        username: 'root',
        password: 'passwordpass1',
        database: 'db',
        logging: false,
      });
      sequelize.addModels([Product, ProductCategory, ProductAttributeValue, Department, Category, Attribute, AttributeValue, Review, Customer, Order, OrderDetail, ShoppingCart, Tax, Shipping, ShippingRegion, Stripe]);
      await sequelize.sync();
      return sequelize;
    },
  },
];

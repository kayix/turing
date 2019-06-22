import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { DepartmentModule } from './department/department.module';
import { CategoryModule } from './category/category.module';
import { AttributeModule } from './attribute/attribute.module';
import { ReviewModule } from './review/review.module';
import { CustomerModule } from './customer/customer.module';
import { OrderModule } from './order/order.module';
import { ShoppingCartModule } from './shoppingcart/shoppingcart.module';
import { TaxModule } from './tax/tax.module';
import { ShippingModule } from './shipping/shipping.module';
import { StripeModule } from './stripe/stripe.module';

@Module({
  imports: [ProductModule, DepartmentModule, CategoryModule, AttributeModule, ReviewModule, CustomerModule, OrderModule, ShoppingCartModule, TaxModule, ShippingModule, StripeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { ShoppingCartController } from './shoppingcart.controller';
import { ShoppingCartService } from './shoppingcart.service';
import { shoppingCartProviders } from './shoppingcart.provider';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [ShoppingCartController],
  providers: [ShoppingCartService, ...shoppingCartProviders],
})
export class ShoppingCartModule {}

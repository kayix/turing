import { Controller, Get, Post, Put, Delete, UsePipes, Body, Param } from '@nestjs/common';
import { ShoppingCartService } from './shoppingcart.service';
import { IAddCart } from './interfaces/add.cart.interface';
import { IGetCart } from './interfaces/get.cart.interface';
import { IUpdateCartParams, IUpdateCartBody } from './interfaces/update.cart.interface';
import { IEmptyCart } from './interfaces/empty.cart.interface';
import { IMoveCart } from './interfaces/move.cart.interface';
import { ITotalCart } from './interfaces/total.cart.interface';
import { ISaveCart } from './interfaces/save.cart.interface';
import { IGetSavedCart } from './interfaces/saved.cart.interface';
import { IRemoveCart } from './interfaces/remove.cart.interface';
import { ValidationPipe } from '../validation.pipe';

@Controller('shoppingcart')
export class ShoppingCartController {
  constructor(private readonly shoppingCartService: ShoppingCartService) {}
  @Get('/generateUniqueId')
  getGenerateUniqueId(): Promise<object> {
    return this.shoppingCartService.getGenerateUniqueId();
  }

  @Post('/add')
  @UsePipes(new ValidationPipe())
  postAdd(@Body() body: IAddCart): Promise<any> {
    return this.shoppingCartService.postAddCart(body);
  }

  @Put('/update/:item_id')
  @UsePipes(new ValidationPipe())
  putUpdateItem(@Param() params: IUpdateCartParams, @Body() body: IUpdateCartBody): Promise<any> {
    return this.shoppingCartService.putUpdateItem(params.item_id, body.quantity);
  }

  @Delete('/empty/:cart_id')
  @UsePipes(new ValidationPipe())
  deleteEmptyCart(@Param() params: IEmptyCart): Promise<any> {
    return this.shoppingCartService.deleteEmptyCart(params.cart_id);
  }

  @Get('/moveToCart/:item_id')
  @UsePipes(new ValidationPipe())
  getMoteToCart(@Param() params: IMoveCart): Promise<any> {
    return this.shoppingCartService.getMoteToCart(params.item_id);
  }

  @Get('/totalAmount/:cart_id')
  @UsePipes(new ValidationPipe())
  getTotalAmount(@Param() params: ITotalCart): Promise<any> {
    return this.shoppingCartService.getTotalAmount(params.cart_id);
  }

  @Get('/saveForLater/:item_id')
  @UsePipes(new ValidationPipe())
  getSaveForLater(@Param() params: ISaveCart): Promise<any> {
    return this.shoppingCartService.getSaveForLater(params.item_id);
  }

  @Get('/getSaved/:cart_id')
  @UsePipes(new ValidationPipe())
  getGetSaved(@Param() params: IGetSavedCart): Promise<any> {
    return this.shoppingCartService.getGetSaved(params.cart_id);
  }

  @Delete('/removeProduct/:item_id')
  @UsePipes(new ValidationPipe())
  deleteRemoveProduct(@Param() params: IRemoveCart): Promise<any> {
    return this.shoppingCartService.deleteRemoveProduct(params.item_id);
  }

  @Get('/:cart_id')
  @UsePipes(new ValidationPipe())
  getCart(@Param() params: IGetCart): Promise<object> {
    return this.shoppingCartService.getCart(params);
  }
}

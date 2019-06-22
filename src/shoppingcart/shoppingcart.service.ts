import { HttpException, Inject, Injectable } from '@nestjs/common';
import { ShoppingCart } from './shoppingcart.entity';
import TYPES from '../constants';
import { IAddCart } from './interfaces/add.cart.interface';
import { IGetCart } from './interfaces/get.cart.interface';
import { Product } from '../product/product.entity';

@Injectable()
export class ShoppingCartService {
  constructor(
    @Inject(TYPES.SHOPPING_CART)
    private readonly shoppingCartRepository: typeof ShoppingCart,

    @Inject(TYPES.PRODUCT_REPOSITORY)
    private readonly productRepository: typeof Product,
  ) {}

  async getGenerateUniqueId(): Promise<object> {
    return {
      cart_id: Math.random()
        .toString(36)
        .slice(-10),
    };
  }

  async postAddCart(body: IAddCart) {
    const findProduct = await this.productRepository.findOne({ where: { product_id: body.product_id } });
    if (!findProduct) {
      throw new HttpException('Invalid product_id', 400);
    }
    await this.shoppingCartRepository.create({
      cart_id: body.cart_id,
      product_id: body.product_id,
      attributes: body.attributes,
      quantity: 1,
      added_on: new Date(),
    });
    const response = [];
    const shoppingCarts = await this.shoppingCartRepository.findAll({ where: { cart_id: body.cart_id }, include: [{ model: Product }] });
    shoppingCarts.forEach(shopCart => {
      response.push({
        item_id: shopCart.item_id,
        name: shopCart.product.name,
        attributes: shopCart.attributes,
        product_id: shopCart.product_id,
        price: shopCart.product.price,
        quantity: shopCart.quantity,
        image: shopCart.product.thumbnail,
        subtotal: String(Number(shopCart.product.price) * shopCart.quantity),
      });
    });
    return response;
  }

  async getCart(params: IGetCart): Promise<any> {
    const response = [];
    const shoppingCarts = await this.shoppingCartRepository.findAll({ where: { cart_id: params.cart_id }, include: [{ model: Product }] });
    shoppingCarts.forEach(shopCart => {
      response.push({
        item_id: shopCart.item_id,
        name: shopCart.product.name,
        attributes: shopCart.attributes,
        product_id: shopCart.product_id,
        price: shopCart.product.price,
        quantity: shopCart.quantity,
        image: shopCart.product.thumbnail,
        subtotal: String(Number(shopCart.product.price) * shopCart.quantity),
      });
    });
    return response;
  }

  async putUpdateItem(itemId: number, quantity: number) {
    const cartItem = await this.shoppingCartRepository.findOne({ where: { item_id: itemId } });
    if (!cartItem) {
      throw new HttpException('Invalid item_id', 400);
    }
    await this.shoppingCartRepository.update({ quantity }, { where: { item_id: itemId } });
    return this.getCart({ cart_id: cartItem.cart_id });
  }

  async deleteEmptyCart(cartId: string) {
    await this.shoppingCartRepository.destroy({ where: { cart_id: cartId } });
    return [];
  }

  async getMoteToCart(itemId: number) {
    return;
  }

  async getTotalAmount(cartId: string) {
    const cartItem = await this.shoppingCartRepository.findOne({ where: { cart_id: cartId } });
    if (!cartItem) {
      throw new HttpException('Invalid cart_id', 400);
    }
    let totalAmount: number = 0;
    const items = await this.shoppingCartRepository.findAll({ where: { cart_id: cartId }, include: [{ model: Product }] });
    items.forEach(item => {
      totalAmount = totalAmount + item.quantity * Number(item.product.price);
    });
    return {
      total_amount: totalAmount,
    };
  }

  async getSaveForLater(itemId: number) {
    const cartItem = await this.shoppingCartRepository.findOne({ where: { item_id: itemId } });
    if (!cartItem) {
      throw new HttpException('Invalid item_id', 400);
    }
    await this.shoppingCartRepository.update({ buy_now: 0 }, { where: { item_id: itemId } });
  }

  async getGetSaved(cartId: string) {
    const response = [];
    const shoppingCarts = await this.shoppingCartRepository.findAll({ where: { cart_id: cartId }, include: [{ model: Product }] });
    shoppingCarts.forEach(shopCart => {
      response.push({
        item_id: shopCart.item_id,
        name: shopCart.product.name,
        attributes: shopCart.attributes,
        price: shopCart.product.price,
      });
    });
    return response;
  }

  async deleteRemoveProduct(itemId: number) {
    await this.shoppingCartRepository.destroy({ where: { item_id: itemId } });
  }
}

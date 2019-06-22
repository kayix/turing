import { HttpException, Inject, Injectable } from '@nestjs/common';
import { Order, OrderDetail } from './order.entity';
import { Customer } from '../customer/customer.entity';
import { ShoppingCart } from '../shoppingcart/shoppingcart.entity';
import { ICreateOrder } from './interfaces/create.order.interface';
import TYPES from '../constants';
import { Product } from '../product/product.entity';

@Injectable()
export class OrderService {
  constructor(
    @Inject(TYPES.ORDER_REPOSITORY)
    private readonly orderRepository: typeof Order,

    @Inject(TYPES.ORDER_DETAIL_REPOSITORY)
    private readonly orderDetailsRepository: typeof OrderDetail,

    @Inject(TYPES.SHOPPING_CART)
    private readonly shoppingCartRepository: typeof ShoppingCart,
  ) {}

  async postOrder(customer: Customer, body: ICreateOrder) {
    const order = await this.orderRepository.create({
      shipping_id: body.shipping_id,
      tax_id: body.tax_id,
      customer_id: customer.customer_id,
      created_on: new Date(),
    });
    let total = 0;
    const cartItems = await this.shoppingCartRepository.findAll({ where: { cart_id: body.cart_id }, include: [{ model: Product }] });
    for (const cartItem of cartItems) {
      total = total + Number(cartItem.product.price) * cartItem.quantity;
      await this.orderDetailsRepository.create({
        order_id: order.order_id,
        product_id: cartItem.product_id,
        attributes: cartItem.attributes,
        product_name: cartItem.product.name,
        quantity: cartItem.quantity,
        unit_cost: cartItem.product.price,
      });
    }
    await this.orderRepository.update({ total_amount: total }, { where: { order_id: order.order_id } });
    return {
      orderId: order.order_id,
    };
  }

  async getOrder(customer: Customer, orderId) {
    const order = await this.orderRepository.findOne({ where: { order_id: orderId } });
    const orderDetail = await this.orderDetailsRepository.findOne({ where: { order_id: orderId } });
    if (!order || order.customer_id !== customer.customer_id) {
      throw new HttpException('Order not found', 400);
    }
    return {
      order_id: order.order_id,
      product_id: orderDetail.product_id,
      attributes: orderDetail.attributes,
      product_name: orderDetail.product_name,
      quantity: orderDetail.quantity,
      unit_cost: orderDetail.quantity,
      subtotal: orderDetail.unit_cost * orderDetail.quantity,
    };
  }

  async getShortDetail(customer: Customer, params) {
    const order = await this.orderRepository.findOne({ where: { order_id: params.order_id } });
    const orderDetail = await this.orderDetailsRepository.findOne({ where: { order_id: params.order_id } });
    if (!order || order.customer_id !== customer.customer_id) {
      throw new HttpException('Order not found', 400);
    }
    return {
      order_id: order.order_id,
      total: order.total_amount,
      created_on: order.created_on,
      shipped_on: order.shipped_on,
      status: order.status,
      name: orderDetail.product_name,
    };
  }

  async getOrdersOfCustomer(customer: Customer) {
    const response = [];
    const orders = await this.orderRepository.findAll({ where: { customer_id: customer.customer_id } });
    for (const order of orders) {
      const orderDetail = await this.getOrder(customer, order.order_id);
      response.push(orderDetail);
    }
    return response;
  }
}

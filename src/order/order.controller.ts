import { Controller, Get, Post, UsePipes, Body, UseGuards, Param } from '@nestjs/common';
import { OrderService } from './order.service';
import { ICreateOrder } from './interfaces/create.order.interface';
import { IGetOrder } from './interfaces/get.order.interface';
import { JwtAuthGuard } from '../auth.guard';
import { GetCustomer } from '../customer/customer.decorator';
import { ValidationPipe } from '../validation.pipe';
import { IOrder } from './interfaces/order.interface';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}
  @Post('/')
  @UsePipes(new ValidationPipe())
  @UseGuards(new JwtAuthGuard())
  postOrder(@GetCustomer() customer, @Body() body: ICreateOrder): Promise<any> {
    return this.orderService.postOrder(customer, body);
  }

  @Get('/inCustomer')
  @UsePipes(new ValidationPipe())
  @UseGuards(new JwtAuthGuard())
  getOrdersOfCustomer(@GetCustomer() customer): Promise<any> {
    return this.orderService.getOrdersOfCustomer(customer);
  }

  @Get('/shortDetail/:order_id')
  @UsePipes(new ValidationPipe())
  @UseGuards(new JwtAuthGuard())
  getShortDetails(@GetCustomer() customer, @Param() params: IGetOrder): Promise<any> {
    return this.orderService.getShortDetail(customer, params);
  }

  @Get('/:order_id')
  @UsePipes(new ValidationPipe())
  @UseGuards(new JwtAuthGuard())
  getOrder(@GetCustomer() customer, @Param() params: IOrder): Promise<any> {
    return this.orderService.getOrder(customer, params.order_id);
  }
}

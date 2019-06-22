import { Controller, Post, Body, Put, UseGuards } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { IUpdateCustomerAddress } from './interfaces/update.address.interface';
import { IUpdateCustomerCreditCard } from './interfaces/update.creditCard.interface';
import { UsePipes } from '@nestjs/common';
import { GetCustomer } from './customer.decorator';
import { JwtAuthGuard } from '../auth.guard';
import { IPostCustomer } from './interfaces/post.interface';
import { ILogin } from './interfaces/login.interface';
import { ValidationPipe } from '../validation.pipe';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customerService: CustomerService) {}

  @Post('/')
  @UsePipes(new ValidationPipe())
  async postCustomer(@Body() body: IPostCustomer) {
    return this.customerService.postCustomer(body);
  }

  @Put('/address')
  @UseGuards(new JwtAuthGuard())
  @UsePipes(new ValidationPipe())
  async putCustomersAddress(@GetCustomer() customer, @Body() body: IUpdateCustomerAddress) {
    return this.customerService.putCustomersAddress(customer, body);
  }

  @Put('/creditCard')
  @UseGuards(new JwtAuthGuard())
  @UsePipes(new ValidationPipe())
  async putCustomersCreditCard(@GetCustomer() customer, @Body() body: IUpdateCustomerCreditCard) {
    return this.customerService.putCustomersCreditCard(customer, body);
  }

  @Post('/login')
  @UsePipes(new ValidationPipe())
  async postCustomersLogin(@Body() body: ILogin) {
    return this.customerService.postCustomersLogin(body);
  }
}

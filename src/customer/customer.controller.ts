import { Controller, Get, Body, Put, UseGuards } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { UsePipes } from '@nestjs/common';
import { GetCustomer } from './customer.decorator';
import { JwtAuthGuard } from '../auth.guard';
import { IPutCustomer } from './interfaces/put.interface';
import { ValidationPipe } from '../validation.pipe';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get('/')
  @UseGuards(new JwtAuthGuard())
  async getCustomer(@GetCustomer() customer) {
    return this.customerService.getCustomer(customer);
  }

  @Put('/')
  @UseGuards(new JwtAuthGuard())
  @UsePipes(new ValidationPipe())
  async putCustomer(@GetCustomer() customer, @Body() body: IPutCustomer) {
    return this.customerService.putCustomer(customer, body);
  }

}

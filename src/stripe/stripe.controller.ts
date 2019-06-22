import { Controller, Post, Body, UsePipes, UseGuards } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { ICharge } from './interfaces/charge.interface';
import { JwtAuthGuard } from '../auth.guard';
import { GetCustomer } from '../customer/customer.decorator';
import { ValidationPipe } from '../validation.pipe';

@Controller('stripe')
export class StripeController {
  constructor(private readonly stripeService: StripeService) {}

  @Post('/charge')
  @UseGuards(new JwtAuthGuard())
  @UsePipes(new ValidationPipe())
  postCharge(@GetCustomer() customer, @Body() body: ICharge) {
    return this.stripeService.postCharge(customer, body);
  }

  @Post('/webhooks')
  postWebHooks() {
    return this.stripeService.postWebHooks();
  }
}

import { HttpException, Inject, Injectable } from '@nestjs/common';
import { Stripe as StripeModel } from './stripe.entity';
import { ICharge } from './interfaces/charge.interface';
import * as Stripe from 'stripe';
import TYPES from '../constants';
import { Customer } from '../customer/customer.entity';

const stripe = new Stripe('sk_test_lomdOfxbm7QDgZWvR82UhV6D');

@Injectable()
export class StripeService {
  constructor(
    @Inject(TYPES.STRIPE_REPOSITORY)
    private readonly stripeRepository: typeof StripeModel,
  ) {}

  /**
   * Testing Token
   */
  async getToken() {
    const customer = await stripe.customers.create({ email: 'foo-customer@example.com' });
    const source = await stripe.customers.createSource(customer.id, { source: 'tok_visa' });
    return source.customer.toString();
  }

  async postCharge(customer: Customer, body: ICharge) {
    let currency = 'USD';
    if (body.currency) {
      currency = body.currency;
    }
    // const stripeToken = await this.getToken();
    const stripeToken = body.stripeToken;
    await this.stripeRepository.create({ order_id: body.order_id, created_on: new Date(), message: body.description, code: 0 });
    try {
      return await stripe.charges.create({ amount: body.amount, currency, customer: stripeToken });
    } catch (e) {
      throw new HttpException(e, 400);
    }
  }

  async postWebHooks() {}
}

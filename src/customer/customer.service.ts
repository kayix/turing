import { HttpException, Inject, Injectable } from '@nestjs/common';
import { Customer } from './customer.entity';
import { IJwtPayload } from '../auth/auth.interface';
import { JwtService } from '@nestjs/jwt';
import { IUpdateCustomerAddress } from './interfaces/update.address.interface';
import { IUpdateCustomerCreditCard } from './interfaces/update.creditCard.interface';
import { ILogin } from './interfaces/login.interface';
import { IPostCustomer } from './interfaces/post.interface';
import * as bcrypt from 'bcrypt';
import TYPES from '../constants';

@Injectable()
export class CustomerService {
  constructor(
    @Inject(TYPES.CUSTOMER_REPOSITORY)
    private readonly customerRepository: typeof Customer,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(email: string): Promise<string> {
    // In the real-world app you shouldn't expose this method publicly
    // instead, return a token once you verify user credentials
    const customer: IJwtPayload = { email };
    return this.jwtService.sign(customer);
  }

  async validateCustomer(payload: IJwtPayload): Promise<any> {
    try {
      const customer = await this.findCustomer(payload.email);
      if (customer) {
        return customer;
      }
      return false;
    } catch (e) {
      throw new Error(e);
    }
  }

  async findCustomer(email: string): Promise<Customer> {
    return await this.customerRepository.findOne({ where: { email } });
  }

  async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return await new Promise((resolve, reject) => {
      bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) {
          reject(err);
        }
        resolve(hash);
      });
    });
  }

  async comparePassword(password: string, hashedPassword): Promise<boolean> {
    return password === hashedPassword;
  }

  formatCreditCard(cardString: string): string {
    if (cardString && cardString.length > 7) {
      return 'XXXXXXXX' + cardString.slice(8);
    }
    return cardString;
  }

  async getCustomer(customer: Customer) {
    return {
      customer_id: customer.customer_id,
      name: customer.name,
      email: customer.email,
      address_1: customer.address_1,
      address_2: customer.address_2,
      city: customer.city,
      region: customer.region,
      postal_code: customer.postal_code,
      country: customer.country,
      shipping_region_id: customer.shipping_region_id,
      day_phone: customer.day_phone,
      eve_phone: customer.eve_phone,
      mob_phone: customer.mob_phone,
      credit_card: this.formatCreditCard(customer.credit_card),
    };
  }

  async postCustomer(body: IPostCustomer) {
    try {
      // const hashedPassword = await this.hashPassword(body.password);
      // console.log('hashedPassword', hashedPassword)
      const customer = await this.customerRepository.create({
        name: body.name,
        email: body.email,
        password: body.password,
      });
      const token = await this.signIn(body.email);
      return {
        customer: {
          schema: {
            customer_id: customer.customer_id,
            name: customer.name,
            email: customer.email,
            address_1: '',
            address_2: '',
            city: '',
            region: '',
            postal_code: '',
            country: '',
            shipping_region_id: '',
            day_phone: '',
            eve_phone: '',
            mob_phone: '',
            credit_card: '',
          },
        },
        accessToken: 'Bearer ' + token,
        expires_in: '24h',
      };
    } catch (e) {
      throw new Error(e);
    }
  }

  async putCustomer(customer: Customer, body) {
    try {
      const customerData = {
        name: customer.name,
        email: customer.email,
        password: customer.password,
        day_phone: customer.day_phone,
        eve_phone: customer.eve_phone,
        mob_phone: customer.mob_phone,
      };
      customerData.name = body.name;
      customerData.email = body.email;
      if (body.password) {
        customerData.password = body.password;
        // customerData.password = await this.hashPassword(body.password);
      }
      await this.customerRepository.update(customerData, { where: { customer_id: customer.customer_id } });
      return {
        customer_id: customer.customer_id,
        name: body.name,
        email: body.email,
        address_1: customer.address_1,
        address_2: customer.address_2,
        city: customer.city,
        region: customer.region,
        postal_code: customer.postal_code,
        country: customer.country,
        shipping_region_id: customer.shipping_region_id,
        day_phone: customer.day_phone,
        eve_phone: customer.eve_phone,
        mob_phone: customer.mob_phone,
        credit_card: this.formatCreditCard(customer.credit_card),
      };
    } catch (e) {
      throw new Error(e);
    }
  }

  async putCustomersAddress(customer: Customer, body: IUpdateCustomerAddress) {
    try {
      const addressData = {
        address_1: body.address_1,
        address_2: customer.address_2,
        city: body.city,
        region: body.region,
        postal_code: body.postal_code,
        country: body.country,
        shipping_region_id: body.shipping_region_id,
      };
      await this.customerRepository.update(addressData, { where: { customer_id: customer.customer_id } });
      return {
        customer_id: customer.customer_id,
        name: customer.name,
        email: customer.email,
        address_1: body.address_1,
        address_2: body.address_2,
        city: body.city,
        region: body.region,
        postal_code: body.postal_code,
        country: body.country,
        shipping_region_id: body.shipping_region_id,
        day_phone: customer.day_phone,
        eve_phone: customer.eve_phone,
        mob_phone: customer.mob_phone,
        credit_card: this.formatCreditCard(customer.credit_card),
      };
    } catch (e) {
      throw new Error(e);
    }
  }

  async putCustomersCreditCard(customer: Customer, body: IUpdateCustomerCreditCard) {
    try {
      const creditCardData = {
        credit_card: body.credit_card,
      };
      await this.customerRepository.update(creditCardData, { where: { customer_id: customer.customer_id } });
      return {
        customer_id: customer.customer_id,
        name: customer.name,
        email: customer.email,
        address_1: customer.address_1,
        address_2: customer.address_2,
        city: customer.city,
        region: customer.region,
        postal_code: customer.postal_code,
        country: customer.country,
        shipping_region_id: customer.shipping_region_id,
        day_phone: customer.day_phone,
        eve_phone: customer.eve_phone,
        mob_phone: customer.mob_phone,
        credit_card: this.formatCreditCard(body.credit_card),
      };
    } catch (e) {
      throw new Error(e);
    }
  }

  async postCustomersLogin(body: ILogin) {
    const customer: Customer = await this.findCustomer(body.email);
    const isSuccess = await this.comparePassword(body.password, customer.password);
    if (!customer || !isSuccess) {
      throw new HttpException('Invalid credentials', 400);
    }
    const token = await this.signIn(body.email);
    return {
      customer: {
        schema: {
          customer_id: customer.customer_id,
          name: customer.name,
          email: customer.email,
          address_1: customer.address_1,
          address_2: customer.address_2,
          city: customer.city,
          region: customer.region,
          postal_code: customer.postal_code,
          country: customer.country,
          shipping_region_id: customer.shipping_region_id,
          day_phone: customer.day_phone,
          eve_phone: customer.eve_phone,
          mob_phone: customer.mob_phone,
          credit_card: this.formatCreditCard(customer.credit_card),
        },
      },
      accessToken: 'Bearer ' + token,
      expires_in: '24h',
    };
  }
}

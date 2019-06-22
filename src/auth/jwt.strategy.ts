import { ExtractJwt, Strategy } from 'passport-jwt';
import { CustomerService } from '../customer/customer.service';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { IJwtPayload } from './auth.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly customerService: CustomerService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'secretKey',
    });
  }

  async validate(payload: IJwtPayload) {
    const user = await this.customerService.validateCustomer(payload);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}

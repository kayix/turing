import { Module } from '@nestjs/common';
import { CustomerController } from './customer.controller';
import { CustomersController } from './customers.controller';
import { CustomerService } from './customer.service';
import { customerProviders } from './customer.provider';
import { DatabaseModule } from '../database/database.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../auth/jwt.strategy';

@Module({
  imports: [
    DatabaseModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'secretKey',
      signOptions: {
        expiresIn: 60 * 60 * 24,
      },
    }),
  ],
  controllers: [CustomerController, CustomersController],
  providers: [CustomerService, JwtStrategy, ...customerProviders],
  exports: [PassportModule, CustomerService],
})
export class CustomerModule {}

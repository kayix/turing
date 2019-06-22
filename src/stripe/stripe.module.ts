import { Module } from '@nestjs/common';
import { StripeController } from './stripe.controller';
import { StripeService } from './stripe.service';
import { stripeProviders } from './stripe.provider';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [StripeController],
  providers: [StripeService, ...stripeProviders],
})
export class StripeModule {}

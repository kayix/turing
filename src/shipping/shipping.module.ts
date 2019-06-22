import { Module } from '@nestjs/common';
import { ShippingController } from './shipping.controller';
import { ShippingService } from './shipping.service';
import { shippingProviders } from './shipping.provider';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [ShippingController],
  providers: [ShippingService, ...shippingProviders],
})
export class ShippingModule {}

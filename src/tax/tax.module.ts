import { Module } from '@nestjs/common';
import { TaxController } from './tax.controller';
import { TaxService } from './tax.service';
import { taxProviders } from './tax.provider';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [TaxController],
  providers: [TaxService, ...taxProviders],
})
export class TaxModule {}

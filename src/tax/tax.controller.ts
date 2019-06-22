import { Controller, Get, Param, UsePipes } from '@nestjs/common';
import { TaxService } from './tax.service';
import { Tax } from './tax.entity';
import { ITax } from './interfaces/tax.interface';
import { ValidationPipe } from '../validation.pipe';

@Controller('tax')
export class TaxController {
  constructor(private readonly taxService: TaxService) {}
  @Get('/')
  getTaxes(): Promise<Tax[]> {
    return this.taxService.getTaxes();
  }

  @Get('/:tax_id')
  @UsePipes(new ValidationPipe())
  getTax(@Param() params: ITax): Promise<Tax> {
    return this.taxService.getTax(params.tax_id);
  }
}

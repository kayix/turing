import { HttpException, Inject, Injectable } from '@nestjs/common';
import { Tax } from './tax.entity';
import TYPES from '../constants';

@Injectable()
export class TaxService {
  constructor(
    @Inject(TYPES.TAX_REPOSITORY)
    private readonly taxRepository: typeof Tax,
  ) {}

  async getTaxes(): Promise<Tax[]> {
    return this.taxRepository.findAll();
  }

  async getTax(taxId: number): Promise<any> {
    const tax = await this.taxRepository.findOne({ where: { tax_id: taxId } });
    if (!tax) {
      throw new HttpException('Invalid tax_id', 400);
    }
    return tax;
  }
}

import { Controller, Get, Param, HttpException, UsePipes } from '@nestjs/common';
import { AttributeService } from './attribute.service';
import { ValidationPipe } from '../validation.pipe';
import { IAttribute } from './interfaces/attribute.interface';
import { IAttributeValues } from './interfaces/values.interface';
import { IInProduct } from './interfaces/inProduct.interface';

@Controller('attributes')
export class AttributeController {
  constructor(private readonly attributeService: AttributeService) {}
  @Get('/')
  getAttributes(): Promise<any> {
    return this.attributeService.getAttributes();
  }

  @Get('/values/:attribute_id')
  @UsePipes(new ValidationPipe())
  async getAttributeValues(@Param() params: IAttributeValues): Promise<any> {
    return this.attributeService.getAttributeValues(params.attribute_id);
  }

  @Get('/inProduct/:product_id')
  @UsePipes(new ValidationPipe())
  async getInProduct(@Param() params: IInProduct): Promise<any> {
    return this.attributeService.getInProduct(params.product_id);
  }

  @Get('/:attribute_id')
  @UsePipes(new ValidationPipe())
  async getAttribute(@Param() params: IAttribute): Promise<any> {
    const attribute = await this.attributeService.getAttribute(params.attribute_id);
    if (!attribute) {
      throw new HttpException('Attribute did not found', 400);
    }
  }
}

import { Inject, Injectable } from '@nestjs/common';
import { Attribute, AttributeValue } from './attribute.entity';
import { Product, ProductAttributeValue } from '../product/product.entity';
import TYPES from '../constants';

@Injectable()
export class AttributeService {
  constructor(
    @Inject(TYPES.ATTRIBUTE_REPOSITORY)
    private readonly attributeRepository: typeof Attribute,

    @Inject(TYPES.ATTRIBUTE_VALUE_REPOSITORY)
    private readonly attributeValueRepository: typeof AttributeValue,

    @Inject(TYPES.PRODUCT_ATTRIBUTE_VALUE_REPOSITORY)
    private readonly productAttributeValueRepository: typeof ProductAttributeValue,
  ) {}

  async getAttributes(): Promise<any> {
    return this.attributeRepository.findAll();
  }

  async getAttribute(attributeId): Promise<any> {
    return this.attributeRepository.findOne({ where: { attribute_id: attributeId } });
  }

  async getAttributeValues(attributeId: number): Promise<any> {
    return this.attributeValueRepository.findAll({
      where: { attribute_id: attributeId },
      attributes: ['attribute_value_id', 'value'],
    });
  }

  async getInProduct(productId: number): Promise<any> {
    const attributeValues = await this.attributeValueRepository.findAll({
      include: [
        {
          model: Product,
          where: {
            product_id: productId,
          },
        },
        {
          model: Attribute,
        },
      ],
    });
    const response = [];
    attributeValues.forEach(attributeValue => {
      response.push({
        attribute_value_id: attributeValue.attribute_value_id,
        attribute_value: attributeValue.value,
        attribute_name: attributeValue.attributeValue.name,
      });
    });
    return response;
  }
}

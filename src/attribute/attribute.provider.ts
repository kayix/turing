import { Attribute, AttributeValue } from './attribute.entity';
import { ProductAttributeValue } from '../product/product.entity';
import TYPES from '../constants';

export const attributeProviders = [
  {
    provide: TYPES.ATTRIBUTE_REPOSITORY,
    useValue: Attribute,
  },
  {
    provide: TYPES.ATTRIBUTE_VALUE_REPOSITORY,
    useValue: AttributeValue,
  },
  {
    provide: TYPES.PRODUCT_ATTRIBUTE_VALUE_REPOSITORY,
    useValue: ProductAttributeValue,
  },
];

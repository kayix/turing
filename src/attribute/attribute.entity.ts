import { Table, Column, Model, PrimaryKey, BelongsToMany, BelongsTo, AutoIncrement } from 'sequelize-typescript';
import { Product, ProductAttributeValue } from '../product/product.entity';

@Table({ tableName: 'attribute' })
export class Attribute extends Model<Attribute> {
  @PrimaryKey
  @AutoIncrement
  @Column
  attribute_id: number;

  @Column
  name: string;
}

@Table({ tableName: 'attribute_value' })
export class AttributeValue extends Model<AttributeValue> {
  @PrimaryKey
  @AutoIncrement
  @Column
  attribute_value_id: number;

  @Column
  attribute_id: number;

  @Column
  value: string;

  @BelongsTo(() => Attribute, { foreignKey: 'attribute_id' })
  attributeValue: Attribute;

  @BelongsToMany(() => Product, () => ProductAttributeValue)
  products: Product[];
}

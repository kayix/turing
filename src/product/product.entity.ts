import {
  Table,
  Column,
  Model,
  PrimaryKey,
  BelongsToMany,
  ForeignKey,
  HasMany,
  AutoIncrement,
} from 'sequelize-typescript';
import { Category } from '../category/category.entity';
import { AttributeValue } from '../attribute/attribute.entity';
import { Review } from '../review/review.entity';

@Table({ tableName: 'product' })
export class Product extends Model<Product> {
  @PrimaryKey
  @AutoIncrement
  @Column
  product_id: number;

  @Column
  name: string;

  @Column
  description: string;

  @Column
  price: string;

  @Column
  discounted_price: string;

  @Column
  image: string;

  @Column
  image_2: string;

  @Column
  thumbnail: string;

  @Column
  display: number;

  @BelongsToMany(() => Category, () => ProductCategory)
  categories: Category[];

  @BelongsToMany(() => AttributeValue, () => ProductAttributeValue)
  attributeValues: AttributeValue[];

  @HasMany(() => Review, { foreignKey: 'product_id' })
  reviews: Review[];
}

@Table({ tableName: 'product_category' })
export class ProductCategory extends Model<ProductCategory> {
  @ForeignKey(() => Product)
  @Column
  product_id: number;

  @ForeignKey(() => Category)
  @Column
  category_id: number;
}

@Table({ tableName: 'product_attribute' })
export class ProductAttributeValue extends Model<ProductAttributeValue> {
  @ForeignKey(() => Product)
  @Column
  product_id: number;

  @ForeignKey(() => AttributeValue)
  @Column
  attribute_value_id: number;
}

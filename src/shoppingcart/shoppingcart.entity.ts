import { Table, Column, Model, PrimaryKey, AutoIncrement, BelongsTo } from 'sequelize-typescript';
import { Product } from '../product/product.entity';

@Table({ tableName: 'shopping_cart' })
export class ShoppingCart extends Model<ShoppingCart> {
  @PrimaryKey
  @AutoIncrement
  @Column
  item_id: number;

  @Column
  cart_id: string;

  @Column
  product_id: number;

  @Column
  attributes: string;

  @Column
  quantity: number;

  @Column
  buy_now: number;

  @Column
  added_on: Date;

  @BelongsTo(() => Product, { foreignKey: 'product_id' })
  product: Product;
}

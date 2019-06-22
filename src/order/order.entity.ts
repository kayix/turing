import { Table, Column, Model, PrimaryKey, AutoIncrement, BelongsTo } from 'sequelize-typescript';
import { Product } from '../product/product.entity';

@Table({ tableName: 'orders' })
export class Order extends Model<Order> {
  @PrimaryKey
  @AutoIncrement
  @Column
  order_id: number;

  @Column
  total_amount: number;

  @Column
  created_on: Date;

  @Column
  shipped_on: Date;

  @Column
  status: number;

  @Column
  comments: string;

  @Column
  customer_id: number;

  @Column
  auth_code: string;

  @Column
  reference: string;

  @Column
  shipping_id: number;

  @Column
  tax_id: number;
}

@Table({ tableName: 'order_detail' })
export class OrderDetail extends Model<OrderDetail> {
  @PrimaryKey
  @AutoIncrement
  @Column
  item_id: number;

  @Column
  order_id: number;

  @Column
  product_id: number;

  @Column
  attributes: string;

  @Column
  product_name: string;

  @Column
  quantity: number;

  @Column
  unit_cost: number;

}

import { Table, Column, Model, PrimaryKey, AutoIncrement } from 'sequelize-typescript';

@Table({ tableName: 'shipping' })
export class Shipping extends Model<Shipping> {
  @PrimaryKey
  @AutoIncrement
  @Column
  shipping_id: number;

  @Column
  shipping_type: string;

  @Column
  shipping_cost: number;

  @Column
  shipping_region_id: number;
}

@Table({ tableName: 'shipping_region' })
export class ShippingRegion extends Model<ShippingRegion> {
  @PrimaryKey
  @AutoIncrement
  @Column
  shipping_region_id: number;

  @Column
  shipping_region: string;
}

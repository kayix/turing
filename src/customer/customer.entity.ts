import { Table, Column, Model, PrimaryKey, AutoIncrement } from 'sequelize-typescript';

@Table({ tableName: 'customer' })
export class Customer extends Model<Customer> {
  @AutoIncrement
  @PrimaryKey
  @Column
  customer_id: number;

  @Column
  name: string;

  @Column
  email: string;

  @Column
  password: string;

  @Column({ allowNull: true })
  credit_card: string;

  @Column({ allowNull: true })
  address_1: string;

  @Column({ allowNull: true })
  address_2: string;

  @Column({ allowNull: true })
  city: string;

  @Column({ allowNull: true })
  region: string;

  @Column({ allowNull: true })
  postal_code: string;

  @Column({ allowNull: true })
  country: string;

  @Column({ allowNull: true })
  shipping_region_id: number;

  @Column({ allowNull: true })
  day_phone: number;

  @Column({ allowNull: true })
  eve_phone: number;

  @Column({ allowNull: true })
  mob_phone: number;
}

import { Table, Column, Model, PrimaryKey, AutoIncrement } from 'sequelize-typescript';
@Table({ tableName: 'audit' })
export class Stripe extends Model<Stripe> {
  @PrimaryKey
  @AutoIncrement
  @Column
  audit_id: number;

  @Column
  order_id: number;

  @Column
  created_on: Date;

  @Column
  message: string;

  @Column
  code: number;
}

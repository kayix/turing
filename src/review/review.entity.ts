import { Table, Column, Model, PrimaryKey, AutoIncrement } from 'sequelize-typescript';

@Table({ tableName: 'review' })
export class Review extends Model<Review> {
  @PrimaryKey
  @AutoIncrement
  @Column
  review_id: number;

  @Column
  customer_id: number;

  @Column
  product_id: number;

  @Column
  review: string;

  @Column
  rating: number;

  @Column
  created_on: Date;
}

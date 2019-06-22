import { Table, Column, Model, PrimaryKey, BelongsToMany, BelongsTo, AutoIncrement } from 'sequelize-typescript';

@Table({ tableName: 'tax' })
export class Tax extends Model<Tax> {
  @PrimaryKey
  @AutoIncrement
  @Column
  tax_id: number;

  @Column
  tax_type: string;

  @Column
  tax_percentage: number;

}

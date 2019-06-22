import { Table, Column, Model, PrimaryKey, AutoIncrement } from 'sequelize-typescript';

@Table({ tableName: 'department' })
export class Department extends Model<Department> {
  @PrimaryKey
  @AutoIncrement
  @Column
  department_id: number;

  @Column
  name: string;

  @Column
  description: string;
}

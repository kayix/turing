import { Table, Column, Model, PrimaryKey, BelongsToMany, BelongsTo, AutoIncrement } from 'sequelize-typescript';
import { Product, ProductCategory } from '../product/product.entity';
import { Department } from '../department/department.entity';

@Table({ tableName: 'category' })
export class Category extends Model<Category> {
  @PrimaryKey
  @AutoIncrement
  @Column
  category_id: number;

  @Column
  department_id: number;

  @Column
  name: string;

  @Column
  description: string;

  @BelongsTo(() => Department, { foreignKey: 'department_id' })
  department: Department;

  @BelongsToMany(() => Product, () => ProductCategory)
  products: Product[];
}

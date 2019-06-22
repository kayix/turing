import { Inject, Injectable } from '@nestjs/common';
import { Category } from './category.entity';
import { Product } from '../product/product.entity';
import { ICategories } from './interfaces/categories.interface';
import TYPES from '../constants';

@Injectable()
export class CategoryService {
  pagingLimit: number;
  constructor(
    @Inject(TYPES.CATEGORY_REPOSITORY)
    private readonly categoryRepository: typeof Category,
  ) {
    this.pagingLimit = 20;
  }

  async getCategories(params: ICategories): Promise<any> {
    let offset = 0;
    if (!params.page) params.page = 1;
    if (!params.limit) params.limit = this.pagingLimit;
    if (params.page > 1) {
      offset = params.page * params.limit;
    }
    const order = [['category_id', 'DESC']];
    if (params.order) {
      order[0][0] = params.order;
      order[0][1] = 'DESC';
    }
    const categories = await this.categoryRepository.findAll({ limit: Number(params.limit), offset, order });
    return {
      count: categories.length,
      rows: categories,
    };
  }

  async getCategory(id): Promise<any> {
    return this.categoryRepository.findOne({ where: { category_id: id } });
  }

  async getInProduct(productId: number): Promise<any> {
    const items = await this.categoryRepository.findAll({
      attributes: ['category_id', 'department_id', 'name'],
      include: [{ model: Product, where: { product_id: productId } }],
    });
    return items.map(item => [
      {
        name: item.name,
        category_id: item.category_id,
        department_id: item.department_id,
      },
    ]);
  }

  async getInDepartment(departmentId: number): Promise<any> {
    const items = await this.categoryRepository.findAll({
      attributes: ['category_id', 'department_id', 'name', 'description'],
      include: [{ model: Product }],
      where: { department_id: departmentId },
    });
    const response = [];
    items.forEach(item => {
      response.push({
        name: item.name,
        description: item.description,
        category_id: item.category_id,
        department_id: item.department_id,
      });
    });
    return response;
    /*
    const category = await this.categoryRepository.findOne({
      where: { department_id: departmentId },
    });
    if (!category) {
      throw new Error('Invalid Department ID');
    }
    return this.categoryRepository.findAll({
      where: { department_id: departmentId },
    });*/
  }
}

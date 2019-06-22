import { Controller, Get, Param, Query, HttpException, UsePipes } from '@nestjs/common';
import { CategoryService } from './category.service';
import { ValidationPipe } from '../validation.pipe';
import { ICategories } from './interfaces/categories.interface';
import { ICategory } from './interfaces/category.interface';
import { IInProduct } from './interfaces/inProduct.interface';
import { IInDepartment } from './interfaces/inDepartment.interface';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
  @Get('/')
  @UsePipes(new ValidationPipe())
  getCategories(@Query() query: ICategories): Promise<any> {
    return this.categoryService.getCategories(query);
  }

  @Get('/inProduct/:product_id')
  @UsePipes(new ValidationPipe())
  async getInProduct(@Param() params: IInProduct): Promise<any> {
    return this.categoryService.getInProduct(params.product_id);
  }

  @Get('/inDepartment/:department_id')
  @UsePipes(new ValidationPipe())
  async getInDepartment(@Param() params: IInDepartment): Promise<any> {
    return this.categoryService.getInDepartment(params.department_id);
  }

  @Get('/:category_id')
  @UsePipes(new ValidationPipe())
  async getCategory(@Param() params: ICategory): Promise<any> {
    const item = await this.categoryService.getCategory(params.category_id);
    if (!item) {
      throw new HttpException('Category not found', 400);
    }
    return item;
  }
}

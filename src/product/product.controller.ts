import { Controller, Get, Post, Param, Query, Body, UsePipes, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { ValidationPipe } from '../validation.pipe';
import { JwtAuthGuard } from '../auth.guard';
import { GetCustomer } from '../customer/customer.decorator';
import { Customer } from '../customer/customer.entity';
import { IProducts } from './interfaces/products.interface';
import { IProduct } from './interfaces/product.interface';
import { ISearch } from './interfaces/search.interface';
import { IInCategoryParam, IInCategoryQuery } from './interfaces/inCategory.interface';
import { IInDepartmentParams, IInDepartmentQuery } from './interfaces/inDepartment.interface';
import { IProductDetails } from './interfaces/product.details.interface';
import { IProductLocations } from './interfaces/product.locations.interface';
import { IProductReviewsParams, IProductReviewsBody } from './interfaces/product.reviews.interface';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('/')
  @UsePipes(new ValidationPipe())
  getProducts(@Query() params: IProducts): Promise<any> {
    return this.productService.getProducts(params);
  }

  @Get('/search')
  @UsePipes(new ValidationPipe())
  getSearch(@Query() params: ISearch): Promise<any> {
    return this.productService.getSearch(params);
  }

  @Get('/inCategory/:category_id')
  @UsePipes(new ValidationPipe())
  getInCategory(@Param() params: IInCategoryParam, @Query() query: IInCategoryQuery): Promise<any> {
    return this.productService.getInCategory(params.category_id, query);
  }

  @Get('/inDepartment/:department_id')
  @UsePipes(new ValidationPipe())
  getInDepartment(@Param() params: IInDepartmentParams, @Query() query: IInDepartmentQuery): Promise<any> {
    return this.productService.getInDepartment(params.department_id, query);
  }

  @Get('/:product_id/details')
  @UsePipes(new ValidationPipe())
  getProductDetails(@Param() params: IProductDetails): Promise<any> {
    return this.productService.getProductDetails(params.product_id);
  }

  @Get('/:product_id/locations')
  @UsePipes(new ValidationPipe())
  getProductLocations(@Param() params: IProductLocations): Promise<any> {
    return this.productService.getProductLocations(params.product_id);
  }

  @Get('/:product_id/reviews')
  @UsePipes(new ValidationPipe())
  getProductReviews(@Param() params: IProductReviewsParams): Promise<any> {
    return this.productService.getProductReviews(params.product_id);
  }

  @Post('/:product_id/reviews')
  @UseGuards(new JwtAuthGuard())
  @UsePipes(new ValidationPipe())
  postProductReview(@GetCustomer() customer: Customer, @Param() params: IProductReviewsParams, @Body() body: IProductReviewsBody) {
    return this.productService.postProductReview(params.product_id, body, customer);
  }

  @Get('/:product_id')
  @UsePipes(new ValidationPipe())
  async getProduct(@Param() params: IProduct): Promise<any> {
    return this.productService.getProduct(params.product_id);
  }
}

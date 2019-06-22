import { Op } from 'sequelize';
import TYPES from '../constants';
import * as moment from 'moment';
import { HttpException, Inject, Injectable } from '@nestjs/common';
import { Product } from './product.entity';
import { Category } from '../category/category.entity';
import { Customer } from '../customer/customer.entity';
import { Department } from '../department/department.entity';
import { Review } from '../review/review.entity';
import { IInCategoryQuery } from './interfaces/inCategory.interface';
import { IInDepartmentQuery } from './interfaces/inDepartment.interface';
import { ISearch } from './interfaces/search.interface';
import { IProducts } from './interfaces/products.interface';
import { IProductReviewsBody } from './interfaces/product.reviews.interface';

@Injectable()
export class ProductService {
  pagingLimit: number;
  descriptionLimit: number;
  constructor(
    @Inject(TYPES.PRODUCT_REPOSITORY)
    private readonly productRepository: typeof Product,

    @Inject(TYPES.CATEGORY_REPOSITORY)
    private readonly categoryRepository: typeof Category,

    @Inject(TYPES.REVIEW_REPOSITORY)
    private readonly reviewRepository: typeof Review,
  ) {
    this.pagingLimit = 20;
    this.descriptionLimit = 200;
  }

  async getProducts(params: IProducts): Promise<any> {
    let offset = 0;
    if (!params.page) params.page = 1;
    if (!params.limit) params.limit = this.pagingLimit;
    if (params.page > 1) {
      offset = params.page * params.limit;
    }
    const total = await this.productRepository.count();
    const products = await this.productRepository.findAll({
      limit: Number(params.limit),
      offset,
      attributes: ['product_id', 'name', 'description', 'price', 'discounted_price', 'thumbnail'],
    });
    products.forEach(product => {
      product.description = product.description.substr(0, params.description_length || this.descriptionLimit);
    });
    return {
      count: total,
      rows: products,
    };
  }

  async getProduct(id): Promise<any> {
    const product = await this.productRepository.findOne({
      where: { product_id: id },
    });
    if (!product) {
      throw new HttpException(
        {
          message: 'Product did not found',
        },
        400,
      );
    }
    return product;
  }

  async getSearch(params: ISearch): Promise<any> {
    let offset = 0;
    if (!params.page) params.page = 1;
    if (!params.limit) params.limit = this.pagingLimit;
    if (params.page > 1) {
      offset = params.page * params.limit;
    }
    let where;
    if (params.query_string) {
      where = { name: {} };
      where.name[Op.like] = '%' + params.query_string + '%';
    }
    const total = await this.productRepository.count({ where });
    const products = await this.productRepository.findAll({
      limit: Number(params.limit),
      offset,
      where,
      attributes: ['product_id', 'name', 'description', 'price', 'discounted_price', 'thumbnail'],
    });
    products.forEach(product => {
      product.description = product.description.substr(0, params.description_length || this.descriptionLimit);
    });
    return {
      count: total,
      rows: products,
    };
  }

  async getInCategory(categoryId: number, query: IInCategoryQuery): Promise<any> {
    let offset = 0;
    if (!query.page) query.page = 1;
    if (!query.limit) query.limit = this.pagingLimit;
    if (query.page > 1) {
      offset = query.page * query.limit;
    }
    const products = await this.productRepository.findAll({
      include: [
        {
          model: Category,
          where: {
            category_id: categoryId,
          },
        },
      ],
      limit: Number(query.limit),
      offset,
    });
    const productsArray = [];
    products.forEach(product => {
      productsArray.push({
        product_id: product.product_id,
        name: product.name,
        description: product.description.substr(0, query.description_length || this.descriptionLimit),
        price: product.price,
        discounted_price: product.discounted_price,
        thumbnail: product.thumbnail,
      });
    });
    return {
      count: productsArray.length,
      rows: productsArray,
    };
  }

  async getInDepartment(departmentId: number, query: IInDepartmentQuery): Promise<any> {
    let offset = 0;
    if (!query.page) query.page = 1;
    if (!query.limit) query.limit = this.pagingLimit;
    if (query.page > 1) {
      offset = query.page * query.limit;
    }
    const products = await this.productRepository.findAll({
      include: [
        {
          model: Category,
          where: {
            department_id: departmentId,
          },
        },
      ],
      limit: Number(query.limit),
      offset,
    });
    const productsArray = [];
    products.forEach(product => {
      productsArray.push({
        product_id: product.product_id,
        name: product.name,
        description: product.description.substr(0, query.description_length || this.descriptionLimit),
        price: product.price,
        discounted_price: product.discounted_price,
        thumbnail: product.thumbnail,
        display: 1,
      });
    });
    return {
      count: productsArray.length,
      rows: productsArray,
    };
  }

  async getProductDetails(productId: number): Promise<any> {
    const product = await this.productRepository.findOne({
      where: { product_id: productId },
    });
    if (!product) {
      throw new HttpException('Product Not Found', 400);
    }
    return {
      product_id: productId,
      name: product.name,
      description: product.description,
      price: product.price,
      discounted_price: product.discounted_price,
      image: product.image,
      image2: product.image_2,
    };
  }

  async getProductLocations(productId: number): Promise<any> {
    const product = await this.productRepository.findOne({
      where: { product_id: productId },
    });
    if (!product) {
      throw new HttpException('Product Not Found', 400);
    }
    const locations = await this.categoryRepository.findAll({
      include: [
        {
          model: Product,
          where: {
            product_id: productId,
          },
        },
        {
          model: Department,
        },
      ],
    });
    const response = [];
    locations.forEach(location => {
      response.push({
        category_id: location.category_id,
        category_name: location.name,
        department_id: location.department_id,
        department_name: location.department.name,
      });
    });
    return response;
  }

  async getProductReviews(productId: number): Promise<any> {
    const product = await this.productRepository.findOne({
      where: { product_id: productId },
      include: [
        {
          model: Review,
        },
      ],
    });
    if (!product) {
      throw new HttpException('Product Not Found', 400);
    }
    const reviews = [];
    product.reviews.forEach(review => {
      reviews.push({
        name: product.name,
        review: review.review,
        rating: review.rating,
        created_on: moment(review.created_on).format('YYYY-MM-DD hh:mm:ss'),
      });
    });
  }

  async postProductReview(productId: number, body: IProductReviewsBody, customer: Customer): Promise<any> {
    await this.reviewRepository.create({
      customer_id: customer.customer_id,
      product_id: productId,
      review: body.review,
      rating: body.rating,
      created_on: new Date(),
    });
  }
}

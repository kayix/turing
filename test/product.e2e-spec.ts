import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { ProductModule } from '../src/product/product.module';

describe('ProductController (e2e)', () => {
  let app;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ProductModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/products (GET)', () => {
    return request(app.getHttpServer())
      .get('/products')
      .expect(200);
  });

  it('/products/search (GET)', () => {
    return request(app.getHttpServer())
      .get('/products/search')
      .expect(400);
  });

  it('/products/search?query_string=test&limit=10 (GET)', () => {
    return request(app.getHttpServer())
      .get('/products/search?query_string=test&limit=10')
      .expect(200);
  });

  it('/products/search?query_string=test&page=2 (GET)', () => {
    return request(app.getHttpServer())
      .get('/products/search?query_string=test&page=2')
      .expect(200);
  });

  it('/products/search?query_string=test (GET)', () => {
    return request(app.getHttpServer())
      .get('/products/search?query_string=test')
      .expect(200);
  });

  it('/products/1 (GET)', () => {
    return request(app.getHttpServer())
      .get('/products/1')
      .expect(200);
  });

  it('/products/14343 (GET)', () => {
    return request(app.getHttpServer())
      .get('/products/14343')
      .expect(400);
  });

  it('/products/inCategory (GET)', () => {
    return request(app.getHttpServer())
      .get('/products/inCategory')
      .expect(400);
  });

  it('/products/inCategory/1 (GET)', () => {
    return request(app.getHttpServer())
      .get('/products/inCategory/1')
      .expect(200);
  });

  it('/products/inDepartment (GET)', () => {
    return request(app.getHttpServer())
      .get('/products/inDepartment')
      .expect(400);
  });

  it('/products/inDepartment/1 (GET)', () => {
    return request(app.getHttpServer())
      .get('/products/inDepartment/1')
      .expect(200);
  });

  it('/products/1/details (GET)', () => {
    return request(app.getHttpServer())
      .get('/products/1/details')
      .expect(200);
  });

  it('/products/1111/details (GET)', () => {
    return request(app.getHttpServer())
      .get('/products/1111/details')
      .expect(400);
  });

  it('/products/1/locations (GET)', () => {
    return request(app.getHttpServer())
      .get('/products/1/locations')
      .expect(200);
  });

  it('/products/1111/locations (GET)', () => {
    return request(app.getHttpServer())
      .get('/products/1111/locations')
      .expect(400);
  });

  it('/products/1/reviews (GET)', () => {
    return request(app.getHttpServer())
      .get('/products/1/reviews')
      .expect(200);
  });

  it('/products/1111/reviews (GET)', () => {
    return request(app.getHttpServer())
      .get('/products/1111/reviews')
      .expect(400);
  });

  afterAll(async () => {
    await app.close();
  });
});

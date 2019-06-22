import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { CategoryModule } from '../src/category/category.module';

describe('CategoryController (e2e)', () => {
  let app;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [CategoryModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/categories (GET)', () => {
    return request(app.getHttpServer())
      .get('/categories')
      .expect(200);
  });

  it('/categories/1 (GET)', () => {
    return request(app.getHttpServer())
      .get('/categories/1')
      .expect(200);
  });

  it('/categories/inProduct/1 (GET)', () => {
    return request(app.getHttpServer())
      .get('/categories/inProduct/1')
      .expect(200);
  });

  it('/categories/inDepartment/1 (GET)', () => {
    return request(app.getHttpServer())
      .get('/categories/inDepartment/1')
      .expect(200);
  });

  afterAll(async () => {
    await app.close();
  });
});

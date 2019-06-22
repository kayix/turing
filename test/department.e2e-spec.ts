import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { DepartmentModule } from '../src/department/department.module';

describe('DepartmentController (e2e)', () => {
  let app;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [DepartmentModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/departments (GET)', () => {
    return request(app.getHttpServer())
      .get('/departments')
      .expect(200);
  });

  it('/departments/1 (GET)', () => {
    return request(app.getHttpServer())
      .get('/departments/1')
      .expect(200);
  });

  afterAll(async () => {
    await app.close();
  });
});

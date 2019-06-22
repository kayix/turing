import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { CustomerModule } from '../src/customer/customer.module';

describe('CustomerController (e2e)', () => {
  let app;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [CustomerModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/customer (GET)', () => {
    return request(app.getHttpServer())
      .get('/customer')
      .expect(401);
  });

  it('/customer (PUT)', () => {
    return request(app.getHttpServer())
      .put('/customer')
      .expect(401);
  });

  it('/customers/address (PUT)', () => {
    return request(app.getHttpServer())
      .put('/customers/address')
      .expect(401);
  });

  it('/customers/creditCard (PUT)', () => {
    return request(app.getHttpServer())
      .put('/customers/creditCard')
      .expect(401);
  });

  it('/customers/login (POST)', () => {
    return request(app.getHttpServer())
      .post('/customers/login')
      .expect(400);
  });

  afterAll(async () => {
    await app.close();
  });
});

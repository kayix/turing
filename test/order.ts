import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { OrderModule } from '../src/order/order.module';

describe('OrderController (e2e)', () => {
  let app;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [OrderModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/orders/11111 (GET)', () => {
    return request(app.getHttpServer())
      .get('/orders/11111')
      .expect(400);
  });

  it('/orders/shortDetail/1111 (GET)', () => {
    return request(app.getHttpServer())
      .get('/orders/shortDetail/1111')
      .expect(400);
  });

  it('/orders/inCustomer (GET)', () => {
    return request(app.getHttpServer())
      .get('/orders/inCustomer')
      .expect(401);
  });

  afterAll(async () => {
    await app.close();
  });
});

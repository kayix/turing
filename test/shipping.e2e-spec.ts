import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { ShippingModule } from '../src/shipping/shipping.module';

describe('ShippingController (e2e)', () => {
  let app;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ShippingModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/shipping/regions (GET)', () => {
    return request(app.getHttpServer())
      .get('/shipping/regions')
      .expect(200);
  });

  it('/shipping/regions/2 (GET)', () => {
    return request(app.getHttpServer())
      .get('/shipping/regions/2')
      .expect(200);
  });

  it('/shipping/regions/11111 (GET)', () => {
    return request(app.getHttpServer())
      .get('/shipping/regions/1111')
      .expect(400);
  });

  afterAll(async () => {
    await app.close();
  });
});

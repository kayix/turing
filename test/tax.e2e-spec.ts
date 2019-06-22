import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { TaxModule } from '../src/tax/tax.module';

describe('TaxController (e2e)', () => {
  let app;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [TaxModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/tax (GET)', () => {
    return request(app.getHttpServer())
      .get('/tax')
      .expect(200);
  });

  it('/tax/1 (GET)', () => {
    return request(app.getHttpServer())
      .get('/tax/1')
      .expect(200);
  });

  it('/tax/11111 (GET)', () => {
    return request(app.getHttpServer())
      .get('/tax/1111')
      .expect(400);
  });

  afterAll(async () => {
    await app.close();
  });
});

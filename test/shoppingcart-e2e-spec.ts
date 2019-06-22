import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { ShoppingCartModule } from '../src/shoppingcart/shoppingcart.module';

describe('ShoppingCartController (e2e)', () => {
  let app;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ShoppingCartModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/shoppingcart/generateUniqueId (GET)', () => {
    return request(app.getHttpServer())
      .get('/shoppingcart/generateUniqueId')
      .expect(200);
  });

  /*
  it('/shoppingcart/add (POST)', () => {
    return request(app.getHttpServer())
      .post('/attributes/1')
      .send({ cart_id: '', product_id: '', attributes: '' })
      .expect(200);
  });*/

  afterAll(async () => {
    await app.close();
  });
});

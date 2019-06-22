import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AttributeModule } from '../src/attribute/attribute.module';

describe('AttributeController (e2e)', () => {
  let app;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AttributeModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/attributes (GET)', () => {
    return request(app.getHttpServer())
      .get('/attributes')
      .expect(200);
  });

  it('/attributes/1 (GET)', () => {
    return request(app.getHttpServer())
      .get('/attributes/1')
      .expect(200);
  });

  it('/attributes/values/1 (GET)', () => {
    return request(app.getHttpServer())
      .get('/attributes/values/1')
      .expect(200);
  });

  it('/attributes/inProduct/1 (GET)', () => {
    return request(app.getHttpServer())
      .get('/attributes/inProduct/1')
      .expect(200);
  });

  afterAll(async () => {
    await app.close();
  });
});

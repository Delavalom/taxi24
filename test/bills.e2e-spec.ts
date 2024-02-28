import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('BillController E2E Test', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  describe('GET All Bills', () => {
    it('Successful Case', async () => {
      return request(app.getHttpServer()).get('/bills').expect(200);
    });
  });

  describe('GET Bill by ID', () => {
    it('Successful Case', async () => {
      return request(app.getHttpServer()).get(`/bills/${1}`).expect(200);
    });

    it('Invalid ID', async () => {
      return request(app.getHttpServer())
        .get(`/bills/'invalid_id'`)
        .expect(400);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});

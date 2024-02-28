import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import * as request from 'supertest';
import { randomString } from '../src/common/utils/random';
import { faker } from '@faker-js/faker';

describe('DriverController E2E Test', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  describe('POST Create Driver', () => {
    it('Successful Case', async () => {
      for (let i = 0; i < 100; i++) {
        return request(app.getHttpServer())
          .post('/drivers')
          .send({
            name: faker.person.fullName(),
            location: faker.location.nearbyGPSCoordinate().join(','),
          })
          .expect(201);
      }
    });

    it('Invalid Length', async () => {
      return request(app.getHttpServer())
        .post('/drivers')
        .send({
          name: randomString(2),
          location: faker.location.nearbyGPSCoordinate().join(','),
        })
        .expect(400);
    });
  });

  describe('GET All Drivers', () => {
    it('Successful Case', async () => {
      return request(app.getHttpServer()).get('/drivers').expect(200);
    });
  });

  describe('GET Driver by ID', () => {
    it('Successful Case', async () => {
      return request(app.getHttpServer()).get(`/drivers/${1}`).expect(200);
    });

    it('Invalid ID', async () => {
      return request(app.getHttpServer())
        .get(`/drivers/'invalid_id'`)
        .expect(400);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});

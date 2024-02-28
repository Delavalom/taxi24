import { faker } from '@faker-js/faker';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { randomString } from '../src/common/utils/random';

describe('PassengerController E2E Test', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  describe('POST Create Passenger', () => {
    it('Create Successfully', async () => {
      for (let i = 0; i < 100; i++) {
        return request(app.getHttpServer())
          .post('/passengers')
          .send({
            name: faker.person.fullName(),
            location: faker.location.nearbyGPSCoordinate().join(','),
          })
          .expect(201);
      }
    });

    it('Min Length required for Name', async () => {
      return request(app.getHttpServer())
        .post('/passengers')
        .send({
          name: randomString(2),
          location: faker.location.nearbyGPSCoordinate().join(','),
        })
        .expect(400);
    });
  });

  describe('GET All Passengers', () => {
    it('Query Successfully', async () => {
      return request(app.getHttpServer()).get('/passengers').expect(200);
    });
  });

  describe('GET Passenger by ID', () => {
    it('Successful Case', async () => {
      return request(app.getHttpServer()).get(`/passengers/${1}`).expect(200);
    });

    it('Invalid ID', async () => {
      return request(app.getHttpServer())
        .get(`/passengers/'invalid_id'`)
        .expect(400);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});

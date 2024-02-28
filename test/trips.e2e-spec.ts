import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import * as request from 'supertest';
import { randomString } from '../src/common/utils/random';
import { faker } from '@faker-js/faker';
import { TripStatus } from '../src/common/enums/trips.status.enum';

describe('TripController E2E Test', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  describe('POST Create Trip', () => {
    it('Successful Case', async () => {
      for (let i = 0; i < 10; i++) {
        await request(app.getHttpServer())
          .post('/passengers')
          .send({
            name: faker.person.fullName(),
            location: faker.location.nearbyGPSCoordinate().join(','),
          })
          .expect(201);
      }
      for (let i = 0; i < 10; i++) {
        await request(app.getHttpServer())
          .post('/drivers')
          .send({
            name: faker.person.fullName(),
            location: faker.location.nearbyGPSCoordinate().join(','),
          })
          .expect(201);
      }
      for (let i = 0; i < 100; i++) {
        return request(app.getHttpServer())
          .post('/trips')
          .send({
            passengerId: faker.number.int({ min: 1, max: 10 }),
            startingPoint: faker.location.nearbyGPSCoordinate().join(','),
            endingPoint: faker.location.nearbyGPSCoordinate().join(','),
          })
          .expect(201);
      }
    });

    it('Invalid Starting Point', async () => {
      return request(app.getHttpServer())
        .post('/trips')
        .send({
          passengerId: randomString(2),
          startingPoint: faker.location.ordinalDirection(),
          endingPoint: faker.location.nearbyGPSCoordinate().join(','),
        })
        .expect(400);
    });

    it('Invalid Ending Point', async () => {
      return request(app.getHttpServer())
        .post('/trips')
        .send({
          passengerId: randomString(2),
          startingPoint: faker.location.nearbyGPSCoordinate().join(','),
          endingPoint: faker.location.ordinalDirection(),
        })
        .expect(400);
    });
  });

  describe('GET All Trips', () => {
    it('Successful Case', async () => {
      return request(app.getHttpServer()).get('/trips').expect(200);
    });
  });

  describe('GET Trip by ID', () => {
    it('Successful Case', async () => {
      return request(app.getHttpServer()).get(`/trips/${1}`).expect(200);
    });

    it('Invalid ID', async () => {
      return request(app.getHttpServer())
        .get(`/trips/'invalid_id'`)
        .expect(400);
    });
  });

  describe('PATCH Trip status', () => {
    it('Successful Case', async () => {
      return request(app.getHttpServer())
        .patch(`/trips/${1}`)
        .send({
          status: TripStatus.COMPLETED,
        })
        .expect(200);
    });
    it('Invalid ID', async () => {
      return request(app.getHttpServer())
        .get(`/trips/'invalid_id'`)
        .expect(400);
    });

    it('Invalid Status', async () => {
      return request(app.getHttpServer())
        .patch(`/trips/${1}`)
        .send({
          status: 'inprogress',
        })
        .expect(400);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});

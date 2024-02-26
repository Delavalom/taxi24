import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import * as request from 'supertest';
import { Random } from '../src/common/utils/random';

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
      return request(app.getHttpServer())
        .post('/passengers')
        .send({
          name: new Random().randomString(15),
        })
        .expect(201);
    });

    it('Min Length required for Name', async () => {
      return request(app.getHttpServer())
        .post('/passengers')
        .send({
          name: new Random().randomString(2),
        })
        .expect(400);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
